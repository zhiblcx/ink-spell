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
  constructor() {}
  @WebSocketServer()
  server: Server;
  roomId = '1';

  // 发送消息
  @SubscribeMessage('newMessage')
  handleMessage(@MessageBody() body: any) {
    const msg: any = {};
    const { name, message } = body || {};
    msg.text = message;
    msg.name = name;
    this.server.to(this.roomId).emit('newMessage', msg);
  }

  // 离开房间
  @SubscribeMessage('leave')
  handleLeave(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    const { name } = body || {};
    this.server.to(this.roomId).emit('leave', `用户：${name}离开了聊天室`);
    client.leave(this.roomId);
  }

  // 创建房间并加入房间
  @SubscribeMessage('join')
  handleJoin(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    const { name } = body || {};
    client.join(this.roomId);
    this.server.to(this.roomId).emit('join', `用户：${name}加入了聊天室`);
  }

  // 获取当前房间的人数
  @SubscribeMessage('getRoomUsers')
  handleGetRoomUsers() {
    const room = this.server.sockets.adapter.rooms.get(this.roomId);
    if (room) {
      this.server.to(this.roomId).emit('getRoomUsers', room.size);
    } else {
      this.server.to(this.roomId).emit('getRoomUsers', 0);
    }
  }
}
