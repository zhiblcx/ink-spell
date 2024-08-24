import { APIResponse } from '@/core/decorator/APIResponse';
import { R } from '@/shared/res/r';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CollectBookshelfService } from './collect-bookshelf.service';
import { CollectBookshelfVo } from './vo/collect-bookshelf.vo';

@Controller('collect/bookshelf')
@ApiTags('收藏书架管理')
@ApiBearerAuth()
export class CollectBookshelfController {
  constructor(
    private readonly collectBookshelfService: CollectBookshelfService,
  ) {}
  @Get()
  @ApiOperation({ summary: '获得收藏书架列表' })
  @HttpCode(HttpStatus.OK)
  @APIResponse([CollectBookshelfVo], '获取成功')
  async getCollectBookshelfList(@Request() req) {
    return new R({
      message: '获取成功',
      data: await this.collectBookshelfService.getCollectBookshelfList(
        req.user.userId,
      ),
    });
  }

  @Post(':bookShelfId')
  @ApiOperation({ summary: '收藏书架' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(CollectBookshelfVo, '收藏成功')
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

  @Delete(':collectBookShelfId')
  @ApiOperation({ summary: '取消收藏书架' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(CollectBookshelfVo, '取消收藏成功')
  async unCollectBookShelf(
    @Param('collectBookShelfId') collectBookShelfId: number,
  ) {
    return new R({
      message: '取消收藏成功',
      data: await this.collectBookshelfService.unCollectBookShelf(
        collectBookShelfId,
      ),
    });
  }
}
