import { APIResponse } from '@/core/decorator/APIResponse';
import { R } from '@/shared/res/r';
import {
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
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  async acquireBookShelft(@Request() req) {
    return new R({
      message: '查询成功',
      data: await this.bookshelfService.acquireBookShelft(req.user.userId),
    });
  }

  @Get(':bookShelfId')
  @ApiOperation({ summary: '查询书架书本' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(BookShelfInfoVo, '查询成功')
  async acquireBookShelftByBookShelfId(
    @Param('bookShelfId') bookShelfId: number,
  ) {
    return new R({
      message: '查询成功',
      data: await this.bookshelfService.acquireBookShelftByBookShelfId(
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
