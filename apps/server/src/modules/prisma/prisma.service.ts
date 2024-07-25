import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (e) {
      console.log(e);
    }
  }
}
