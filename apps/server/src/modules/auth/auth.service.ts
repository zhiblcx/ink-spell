import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDao } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(loginDao: LoginDao) {
    const user = await this.validateUser(loginDao.account, loginDao.password);
    const payload = { userId: user.id, account: user.account };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(account: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { account } });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
