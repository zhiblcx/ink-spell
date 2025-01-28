import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { UserService } from '@/modules/user/user.service';

@Module({
  providers: [SocketGateway, UserService],
})
export class SocketModule { }
