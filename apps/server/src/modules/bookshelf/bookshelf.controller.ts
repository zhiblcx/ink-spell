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

@Controller('bookshelf')
@ApiTags('书架管理')
@ApiBearerAuth()
export class BookshelfController {
  constructor(private readonly bookshelfService: BookshelfService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '新增书架' })
  @ApiOkResponse({
    description: '返回示例',
    example: {
      message: '新增成功',
    },
  })
  async createBookShelf(
    @Request() req,
    @Body() createBookshelfDto: CreateBookshelfDto,
  ) {
    await this.bookshelfService.createBookShelf(req, createBookshelfDto);
    return {
      message: '新增成功',
    };
  }

  @Delete(':bookShelfId')
  @ApiOperation({ summary: '删除书架' })
  async deleteBookShelf(@Param('bookShelfId') bookShelfId: number) {
    console.log(bookShelfId);
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
