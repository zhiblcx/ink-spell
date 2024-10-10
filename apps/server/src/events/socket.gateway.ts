import { PrismaService } from '@/modules/prisma/prisma.service';
import { UserService } from '@/modules/user/user.service';
import { MessageEnum } from '@/shared/enums/MessageEnum';
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
// @WebSocketGateway是一个装饰器，用于创建WebSocket网关类。WebSocket网关类是用于处理 WebSocket连接和消息的核心组件之一。
// 它充当WebSocket服务端的中间人，负责处理客户端发起的连接请求，并定义处理不同类型消息的逻辑
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
  ) {}
  @WebSocketServer()
  server: Server;
  roomId = '1';
  currentUsers = [];
  isHandlingLeave = false;
  isHandlingJoin = false;
  joinQueue = [];
  leaveQueue = [];
  allMessages = [];

  async handleBatchMessages() {
    try {
      await this.prisma.message.createMany({
        data: this.allMessages,
      });
      this.allMessages = [];
    } catch (err) {
      throw new BadRequestException('服务器错误');
    }
  }

  // 发送消息
  @SubscribeMessage('newMessage')
  async handleMessage(@MessageBody() body: any) {
    const msg: any = {};
    const { userId, message } = body || {};
    msg.text = message;
    msg.userId = userId;
    msg.user = await this.userService.getUserInfo(userId);
    this.allMessages.push({ userId, text: message, type: MessageEnum.MESSAGE });
    msg.type = MessageEnum.MESSAGE;
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
    await this.handleBatchMessages();
    const { name, id } = body || {};
    if (!this.currentUsers.includes(id)) {
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

    // 处理队列中的请求
    const processQueue = async () => {
      this.isHandlingLeave = true;
      const nextRequest = this.leaveQueue[0];
      try {
        const message = await this.prisma.message.create({
          data: {
            text: `用户：${nextRequest.name}离开了聊天室`,
            userId: id,
            type: MessageEnum.LEAVE,
          },
        });

        this.currentUsers = this.currentUsers.filter(
          (item) => item !== nextRequest.id,
        );

        client.leave(this.roomId);

        this.server.to(this.roomId).emit('leave', {
          text: `用户：${nextRequest.name}离开了聊天室`,
          type: MessageEnum.LEAVE,
          id: message.id,
        });
      } catch (error) {
        // 处理错误
        throw new BadRequestException('服务器错误');
      } finally {
        // 处理完一个请求后，从队列中移除并继续处理下一个请求
        this.leaveQueue.shift();
        if (this.leaveQueue.length > 0) {
          processQueue();
        } else {
          this.isHandlingLeave = false;
        }
      }
    };

    processQueue();
  }

  // 创建房间并加入房间
  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    const { name, id } = body || {};
    const message = await this.prisma.message.create({
      data: {
        text: `用户：${name}加入了聊天室`,
        userId: id,
        type: MessageEnum.JOIN,
      },
    });

    client.join(this.roomId);
    this.currentUsers.push(id);
    this.server.to(this.roomId).emit('join', {
      text: `用户：${name}加入了聊天室`,
      type: MessageEnum.JOIN,
      id: message.id,
    });

    // if (this.currentUsers.includes(id)) {
    //   return;
    // }
    // // 检查用户是否已经在队列中
    // if (this.joinQueue.some((user) => user.id === id)) {
    //   return;
    // }

    // this.joinQueue.push({ name, id });

    // // 如果当前有请求正在处理或队列为空，则直接返回
    // if (this.isHandlingJoin || this.joinQueue.length < 1) {
    //   return;
    // }

    // // 处理队列中的请求
    // const processQueue = async () => {
    //   this.isHandlingJoin = true;
    //   const nextRequest = this.joinQueue[0];
    //   try {
    //     const message = await this.prisma.message.create({
    //       data: {
    //         text: `用户：${nextRequest.name}加入了聊天室`,
    //         userId: id,
    //         type: MessageEnum.JOIN,
    //       },
    //     });

    //     client.join(this.roomId);
    //     this.currentUsers.push(id);
    //     this.server.to(this.roomId).emit('join', {
    //       text: `用户：${nextRequest.name}加入了聊天室`,
    //       type: MessageEnum.JOIN,
    //       id: message.id,
    //     });
    //   } catch (error) {
    //     // 处理错误
    //   } finally {
    //     // 处理完一个请求后，从队列中移除并继续处理下一个请求
    //     this.joinQueue.shift();
    //     if (this.joinQueue.length > 0) {
    //       processQueue();
    //     } else {
    //       this.isHandlingJoin = false;
    //     }
    //   }
    // };

    // processQueue();
  }

  // 获取当前房间的人数
  @SubscribeMessage('getRoomUsers')
  handleGetRoomUsers() {
    this.server.to(this.roomId).emit('getRoomUsers', this.currentUsers.length);
  }
}
