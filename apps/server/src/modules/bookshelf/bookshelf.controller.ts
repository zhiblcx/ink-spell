import { APIResponse } from '@/core/decorator/APIResponse';
import { R } from '@/shared/res/r';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  Response,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as fs from 'node:fs';
import { BookshelfService } from './bookshelf.service';
import { CreateBookshelfDto } from './dto/create-bookshelf.dto';
import { BookShelfInfoVo } from './vo/bookshelf.info.vo';
import { CreateBookShelfVo } from './vo/create-bookshelf.vo';

@Controller('bookshelf')
@ApiTags('书架管理')
@ApiBearerAuth()
export class BookshelfController {
  constructor(private readonly bookshelfService: BookshelfService) {}

  @Post()
  @ApiOperation({ summary: '新增书架' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(CreateBookShelfVo)
  async createBookShelf(
    @Request() req,
    @Body() createBookshelfDto: CreateBookshelfDto,
  ) {
    const result = await this.bookshelfService.createBookShelf(
      req,
      createBookshelfDto,
    );
    if (result == undefined) {
      return new R({
        message: '书架名称重复',
      });
    } else {
      return new R({
        message: '新增成功',
        data: new CreateBookShelfVo(result),
      });
    }
  }

  @Delete(':bookShelfId')
  @ApiOperation({ summary: '删除书架' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, '删除成功')
  async deleteBookShelf(@Param('bookShelfId') bookShelfId: number) {
    await this.bookshelfService.deleteBookShelf(bookShelfId);
    return new R({
      message: '删除成功',
    });
  }

  @Get()
  @ApiOperation({ summary: '查询书架' })
  @HttpCode(HttpStatus.OK)
  @APIResponse([CreateBookShelfVo], '查询成功')
  async acquireBookShelf(@Request() req) {
    return new R({
      message: '查询成功',
      data: await this.bookshelfService.acquireBookShelf(req.user.userId),
    });
  }

  @Get('/download/:bookShelfId')
  @ApiOperation({ summary: '下载书架书籍笔记' })
  @HttpCode(HttpStatus.OK)
  async downloadBookShelf(
    @Param('bookShelfId') bookShelfId: number,
    @Response() res,
  ) {
    const data =
      await this.bookshelfService.acquireBookShelfByBookShelfId(bookShelfId);
    const filePath = `public/notes/`;
    const fileName = `${bookShelfId}.txt`;

    let content = '';

    for (let i = 0; i < data.length; i++) {
      content += `${data[i].name || '暂无书名'}\n`;
      content += `作者：${data[i].author || '暂无作者'}\n`;
      content += `主角：${data[i].protagonist || '暂无主角'}\n`;
      content += `描述：${data[i].description || '暂无描述'}\n\n`;
    }

    fs.writeFile(filePath + fileName, content, (err) => {
      if (err) {
        throw new BadRequestException('笔记下载失败，请稍后再试哦~');
      } else {
        res.download(filePath + fileName, new Date().valueOf() + '.txt');
      }
    });
  }

  @Get(':bookShelfId')
  @ApiOperation({ summary: '查询书架书本' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(BookShelfInfoVo, '查询成功')
  async acquireBookShelfByBookShelfId(
    @Param('bookShelfId') bookShelfId: number,
  ) {
    return new R({
      message: '查询成功',
      data: await this.bookshelfService.acquireBookShelfByBookShelfId(
        bookShelfId,
      ),
    });
  }

  @Put(':bookShelfId')
  @ApiOperation({ summary: '更新书架' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(CreateBookShelfVo, '更新成功')
  async updateBookShelf(
    @Param('bookShelfId') bookShelfId: number,
    @Body() updateBookshelfDto: CreateBookshelfDto,
  ) {
    return new R({
      message: '更新成功',
      data: await this.bookshelfService.updateBookShelf(
        bookShelfId,
        updateBookshelfDto,
      ),
    });
  }
}
