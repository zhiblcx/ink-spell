import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}
  async uploadFile(filePath: string) {
    // this.prisma.book.create({
    //   data: {
    //     bookFile: filePath,
    //   },
    // });
  }
}
