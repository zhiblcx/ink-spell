import {
  detectFileEncoding,
  readFileContent,
} from '@/shared/utils/fileOperate';
import { Injectable } from '@nestjs/common';
import * as path from 'node:path';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}
  async uploadFile(req, file, md5) {
    const encoding = detectFileEncoding(file.path);
    const filePath = file.path.replace(/\\/g, '/').replace('public', '/static');
    const name = path.parse(file.originalname).name;
    try {
      const currentBookShelf = await this.prisma.bookShelf.findFirst({
        where: { allFlag: true, userId: req.userId },
      });
      await this.prisma.book.create({
        data: {
          encoding,
          name: name,
          bookFile: filePath,
          md5,
          bookShelfId: currentBookShelf.id,
        },
      });
      return true;
    } catch (_) {
      return false;
    }
  }

  async compareMd5(req, md5) {
    const result = {
      md5: false,
      path: '',
    };
    // 数据库没有重复的书籍
    const currentBook = await this.prisma.book.findUnique({ where: { md5 } });
    if (currentBook) {
      // 数据库有重复的书籍
      const currentBookShelf = await this.prisma.bookShelf.findUnique({
        where: { id: currentBook.bookShelfId },
      });
      if (currentBookShelf) {
        // 书籍是自己上传的
        if (currentBookShelf.userId == req.user.userId) {
          result.md5 = true;
        } else {
          // 书籍是别人上传的
          result.md5 = true;
          result.path = currentBook.bookFile;
        }
      }
    }
    return result;
  }

  async showBookContent(bookID) {
    const currentBook = await this.prisma.book.findUnique({
      where: { id: Number(bookID) },
    });
    console.log(currentBook);
    const fileName = currentBook.bookFile.replace(/static/, 'public');
    const content = await readFileContent(fileName, currentBook.encoding);
    return content;
  }
}
