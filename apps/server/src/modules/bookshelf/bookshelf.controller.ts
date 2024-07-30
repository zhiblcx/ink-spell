import { APIResponse } from '@/core/decorator/APIResponse';
import { R } from '@/shared/res/r';
import {
  Body,
  Controller,
  Delete,
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
    return new R({
      message: '新增成功',
      data: new CreateBookShelfVo(
        await this.bookshelfService.createBookShelf(req, createBookshelfDto),
      ),
    });
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

  @Put(':bookShelfId')
  @ApiOperation({ summary: '更新书架' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(CreateBookShelfVo, '更新成功')
  async updateBookShelf(
    @Param('bookShelfId') bookShelfId: number,
    @Body() createBookshelfDto: CreateBookshelfDto,
  ) {
    console.log(bookShelfId, createBookshelfDto);
  }
}
