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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BookshelfService } from './bookshelf.service';
import { CreateBookshelfDto } from './dto/create-bookshelf.dto';
import { CreateBookShelfVo } from './vo/create-bookshelf.vo';

@Controller('bookshelf')
@ApiTags('书架管理')
@ApiBearerAuth()
export class BookshelfController {
  constructor(private readonly bookshelfService: BookshelfService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '新增书架' })
  @ApiOkResponse({
    type: () => ({ ...CreateBookShelfVo, message: '新增成功' }),
  })
  async createBookShelf(
    @Request() req,
    @Body() createBookshelfDto: CreateBookshelfDto,
  ) {
    return new R({
      data: new CreateBookShelfVo(
        await this.bookshelfService.createBookShelf(req, createBookshelfDto),
      ),
      message: '新增成功',
    });
  }

  @Delete(':bookShelfId')
  @ApiOperation({ summary: '删除书架' })
  async deleteBookShelf(@Param('bookShelfId') bookShelfId: number) {
    await this.bookshelfService.deleteBookShelf(bookShelfId);
    return new R({
      message: '删除成功',
    });
  }

  @Put(':bookShelfId')
  @ApiOperation({ summary: '更新书架' })
  async updateBookShelf(
    @Param('bookShelfId') bookShelfId: number,
    @Body() createBookshelfDto: CreateBookshelfDto,
  ) {
    console.log(bookShelfId, createBookshelfDto);
  }
}
