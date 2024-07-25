import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(
    account: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({ where: { account } });
    if (user.password != password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: account, account: password };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
