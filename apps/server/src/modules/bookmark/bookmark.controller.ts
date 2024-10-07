import { APIResponse } from '@/core/decorator/APIResponse';
import { R } from '@/shared/res/r';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookmarkService } from './bookmark.service';
import { BookMarkDto } from './dto/book-mark.dto';
import { OperateBookMarkDto } from './dto/operate-book-mark.dto';
import { BookMarkVo } from './vo/book-mark.vo';

@Controller('bookmark')
@ApiTags('书签管理')
@ApiBearerAuth()
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}
  @Get(':bookId')
  @ApiOperation({ summary: '查看书签' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(BookMarkVo, '查询成功')
  async showBookMark(@Request() req, @Param() bookMarkDto: BookMarkDto) {
    return new R({
      message: '查询成功',
      data: await this.bookmarkService.showBookMark(
        parseInt(req.user.userId),
        bookMarkDto.bookId,
      ),
    });
  }

  @Post()
  @ApiOperation({ summary: '添加书签' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, '添加成功')
  async insertBookMark(
    @Request() req,
    @Body() operateBookMarkDto: OperateBookMarkDto,
  ) {
    const { bookId, chapter } = { ...operateBookMarkDto };
    await this.bookmarkService.insertBookMark(
      bookId,
      parseInt(req.user.userId),
      chapter,
    );
    return new R({
      message: '添加成功',
    });
  }

  @Put()
  @ApiOperation({ summary: '删除书签' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, '删除成功')
  async deleteBookMark(
    @Request() req,
    @Body() operateBookMarkDto: OperateBookMarkDto,
  ) {
    const { bookId, chapter } = { ...operateBookMarkDto };
    await this.bookmarkService.deleteBookMark(
      bookId,
      parseInt(req.user.userId),
      chapter,
    );
    return new R({
      message: '删除成功',
    });
  }
}
