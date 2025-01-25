import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { UserModule } from '@/modules/user/user.module';
import { UserService } from '@/modules/user/user.service';

@Module({
  providers: [SocketGateway, UserService],
})
export class SocketModule { }
