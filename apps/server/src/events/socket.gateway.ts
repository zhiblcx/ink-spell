import { PrismaService } from '@/modules/prisma/prisma.service';
import { TranslationService } from '@/modules/translation/translation.service';
import { UserService } from '@/modules/user/user.service';
import { MessageEnum } from '@/shared/enums/message.enum';
import { BadRequestException } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as dayjs from 'dayjs';
import { Server, Socket } from 'socket.io';
// @WebSocketGateway 是一个装饰器，用于创建 WebSocket 网关类。
// WebSocket网关类是用于处理 WebSocket 连接和消息的核心组件之一。
// 它充当 WebSocket 服务端的中间人，负责处理客户端发起的连接请求，并定义处理不同类型消息的逻辑
@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
    transports: ['websocket', 'polling'],
  },
  allowEIO3: true,
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
})
export class SocketGateway {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly translation: TranslationService,
  ) { }
  @WebSocketServer()
  server: Server;
  roomId = '1';
  currentUsers = new Set();
  joinQueue = [];
  leaveQueue = [];
  allMessages = [];
  // 取数据库之后的最后一个下标，确保没有取出来再存进去
  saveIndex = 0;
  isHandlingLeave = false;
  isHandlingJoin = false;
  // 时间
  timeout = 300000;

  // 存储数据，可以等五分钟之后存储，防止频繁存储
  handleBatchMessages = async () => {
    try {
      const messages = this.allMessages
        .slice(this.saveIndex)
        .map(({ id: _, user: __, ...rest }) => rest);
      await this.prisma.message.createMany({
        data: messages,
      });
      this.allMessages = [];
      this.allMessages = await this.userService.handleGetMessages();
      this.saveIndex = this.allMessages.length;
    } catch (err) {
      throw new BadRequestException(this.translation.t('prompt.server_error'));
    }
  };

  saveMessageTimer = () =>
    setInterval(() => this.handleBatchMessages(), this.timeout);

  // 发送消息
  @SubscribeMessage('newMessage')
  async handleMessage(@MessageBody() body: any) {
    const msg: any = {};
    const { userId, message } = body || {};

    msg.text = message;
    msg.userId = userId;
    msg.user = await this.userService.getUserInfo(userId);
    msg.type = MessageEnum.MESSAGE;
    msg.createTimer = new Date()
    this.allMessages.push({
      id: dayjs().valueOf(),
      ...msg,
    });
    this.server
      .to(this.roomId)
      .emit('newMessage', { ...msg, id: dayjs().toDate().valueOf() });
  }

  // 离开房间
  @SubscribeMessage('leave')
  async handleLeave(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    const { name, id } = body || {};

    // 如果当前用户存在，则执行下一步
    if (!this.currentUsers.has(id)) {
      return;
    }

    // 检查用户是否已经在队列中
    if (this.leaveQueue.some((user) => user.id === id)) {
      return;
    }

    this.leaveQueue.push({ name, id });

    // 如果当前有请求正在处理或队列为空，则直接返回
    if (this.isHandlingLeave || this.leaveQueue.length < 1) {
      return;
    }
    this.isHandlingLeave = true;
    // 处理队列中的请求;
    const processQueue = async () => {
      const nextRequest = this.leaveQueue[0];
      try {
        const data = {
          id: dayjs().valueOf(),
          userId: id,
          text: `${this.translation.t("common.user")}：${nextRequest.name}${this.translation.t("common.leave_chatroom")}}`,
          type: MessageEnum.LEAVE,
          createTimer: new Date()
        };

        this.allMessages.push(data);
        this.server.to(this.roomId).emit('leave', data);
      } catch (error) {
        // 处理错误
        throw new BadRequestException(
          this.translation.t('prompt.server_error'),
        );
      } finally {
        // 断开连接
        client.leave(this.roomId);
        // 删除这个人
        this.currentUsers.delete(id);
        if (this.currentUsers.size === 0) {
          clearInterval(this.saveMessageTimer());
          this.handleBatchMessages();
        }
        // 处理完一个请求后，从队列中移除并继续处理下一个请求
        this.leaveQueue.shift();
        // 如果还有请求，则继续执行
        if (this.leaveQueue.length > 0) {
          processQueue();
        } else {
          // 标记处理完成
          this.isHandlingLeave = false;
        }
      }
    };
    await processQueue();
    await this.handleGetRoomUsers();
  }

  // 创建房间并加入房间
  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    const { name, id } = body || {};
    // 如果用户不存在则执行下一步
    if (this.currentUsers.has(id)) {
      return;
    }

    // 检查用户是否已经在队列中，存在的话，退出
    if (this.joinQueue.some((user) => user.id === id)) {
      return;
    }

    // 将用户添加到队列当中
    this.joinQueue.push({ name, id });

    // 如果正在处理或者队列已经没有任务了，则退出，等待任务队列自己处理
    if (this.isHandlingJoin || this.joinQueue.length < 1) {
      return;
    }

    this.isHandlingJoin = true;

    // 处理队列中的请求
    const processQueue = async () => {
      const nextRequest = this.joinQueue[0];
      try {
        const data = {
          id: dayjs().valueOf(),
          userId: id,
          text: `${this.translation.t("common.user")}：${nextRequest.name}${this.translation.t("common.join_chatroom")}`,
          type: MessageEnum.JOIN,
          createTimer: new Date()
        };

        this.allMessages.push(data);
        // 加入房间
        client.join(this.roomId);

        await this.server.to(this.roomId).emit('join', data);
      } catch (error) {
        // 处理错误
        throw new BadRequestException(
          this.translation.t('prompt.server_error'),
        );
      } finally {
        // 加入这个人
        this.currentUsers.add(id);
        if (this.currentUsers.size === 1) {
          await this.handleBatchMessages();
          this.saveMessageTimer();
        }
        // 处理完一个请求后，从队列中移除并继续处理下一个请求
        this.joinQueue.shift();
        if (this.joinQueue.length > 0) {
          processQueue();
        } else {
          this.isHandlingJoin = false;
        }
      }
    };
    await processQueue();
    await this.handleGetRoomUsers();
  }

  // 获取当前房间的人数
  @SubscribeMessage('getRoomUsers')
  handleGetRoomUsers() {
    this.server.to(this.roomId).emit('getRoomUsers', this.currentUsers.size);
  }

  // 获取消息
  @SubscribeMessage('getMessages')
  async handleGetMessages() {
    this.server.to(this.roomId).emit('getMessages', this.allMessages);
  }
}
