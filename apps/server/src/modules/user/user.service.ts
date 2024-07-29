import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(user) {
    const { password: _, ...userInfo } = await this.prisma.user.findUnique({
      where: { id: user.userId },
    });
    const bookSehlfs = await this.prisma.bookShelf.findMany({
      where: { userId: user.userId },
    });
    return { bookSehlfs, ...userInfo };
  }
}
