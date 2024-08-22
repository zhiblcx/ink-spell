import { APIResponse } from '@/core/decorator/APIResponse';
import { R } from '@/shared/res/r';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CollectBookshelfService } from './collect-bookshelf.service';

@Controller('collect/bookshelf')
@ApiTags('收藏书架管理')
@ApiBearerAuth()
export class CollectBookshelfController {
  constructor(
    private readonly collectBookshelfService: CollectBookshelfService,
  ) {}
  @Post(':bookShelfId')
  @ApiOperation({ summary: '收藏书架' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, '收藏成功')
  async collectBookShelf(
    @Request() req,
    @Param('bookShelfId') bookShelfId: number,
  ) {
    return new R({
      message: '收藏成功',
      data: await this.collectBookshelfService.collectBookShelf(
        req.user.userId,
        bookShelfId,
      ),
    });
  }

  @Delete(':bookShelfId')
  @ApiOperation({ summary: '取消收藏书架' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, '取消收藏成功')
  async unCollectBookShelf(@Param('bookShelfId') bookShelfId: number) {
    return new R({
      message: '取消收藏成功',
      data: await this.collectBookshelfService.unCollectBookShelf(bookShelfId),
    });
  }
}
