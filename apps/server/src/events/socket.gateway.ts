import { PrismaService } from '@/modules/prisma/prisma.service';
import { UserService } from '@/modules/user/user.service';
import { MessageEnum } from '@/shared/constants/MessageEnum';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// @WebSocketGateway是一个装饰器，用于创建WebSocket网关类。WebSocket网关类是用于处理 WebSocket连接和消息的核心组件之一。
// 它充当WebSocket服务端的中间人，负责处理客户端发起的连接请求，并定义处理不同类型消息的逻辑
@WebSocketGateway({ cors: { origin: '*' } })
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
  leaveQueue = [];

  // 发送消息
  @SubscribeMessage('newMessage')
  async handleMessage(@MessageBody() body: any) {
    const msg: any = {};
    const { userId, message } = body || {};
    msg.text = message;
    msg.userId = userId;
    msg.user = await this.userService.getUserInfo(userId);
    const text = await this.prisma.message.create({
      data: {
        userId: userId,
        text: message,
        type: MessageEnum.MESSAGE,
      },
    });
    msg.type = MessageEnum.MESSAGE;
    await this.server
      .to(this.roomId)
      .emit('newMessage', { ...msg, id: text.id });
  }

  // 离开房间
  @SubscribeMessage('leave')
  async handleLeave(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
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
            userId: 1,
            type: MessageEnum.LEAVE,
          },
        });

        this.currentUsers = this.currentUsers.filter(
          (item) => item !== nextRequest.id,
        );

        this.server.to(this.roomId).emit('leave', {
          text: `用户：${nextRequest.name}离开了聊天室`,
          type: MessageEnum.LEAVE,
          id: message.id,
        });

        client.leave(this.roomId);
      } catch (error) {
        // 处理错误
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
    if (this.currentUsers.includes(id)) {
      return;
    }
    client.join(this.roomId);
    this.currentUsers.push(id);
    const message = await this.prisma.message.create({
      data: {
        text: `用户：${name}加入了聊天室`,
        userId: 1,
        type: MessageEnum.JOIN,
      },
    });
    this.server.to(this.roomId).emit('join', {
      text: `用户：${name}加入了聊天室`,
      type: MessageEnum.JOIN,
      id: message.id,
    });
  }

  // 获取当前房间的人数
  @SubscribeMessage('getRoomUsers')
  handleGetRoomUsers() {
    this.server.to(this.roomId).emit('getRoomUsers', this.currentUsers.length);
  }

  // 获取聊天记录
  @SubscribeMessage('getMessages')
  async handleGetMessages() {
    const messages = await this.prisma.message.findMany({
      orderBy: {
        createTimer: 'asc',
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
            email: true,
            books: {
              where: { isDelete: false },
              select: { id: true },
            },
            followers: {
              where: { isDelete: false },
              select: { id: true },
            },
            following: {
              where: { isDelete: false },
              select: { id: true },
            },
          },
        },
      },
      take: 200,
    });

    const messageResult = messages.map((item) => ({
      ...item,
      user: {
        ...item.user,
        books: item.user.books.length,
        followers: item.user.followers.length,
        following: item.user.following.length,
      },
    }));

    this.server.to(this.roomId).emit('getMessages', messageResult);
  }
}
