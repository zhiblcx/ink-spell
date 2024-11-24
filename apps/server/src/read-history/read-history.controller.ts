import { Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Request } from '@nestjs/common';
import { ReadHistoryService } from './read-history.service';
import { TranslationService } from '@/modules/translation/translation.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { APIResponse } from '@/core/decorator/APIResponse';
import { R } from '@/shared/res/r';
import { ReadHistoryVo } from './vo/read-history.vo';

@Controller('read-history')
@ApiTags("阅读历史管理")
@ApiBearerAuth()
export class ReadHistoryController {
  constructor(
    private readonly readHistoryService: ReadHistoryService,
    private readonly translation: TranslationService,
  ) { }

  @Get()
  @ApiOperation({ summary: "获取阅读历史" })
  @HttpCode(HttpStatus.OK)
  @APIResponse([ReadHistoryVo], "获取成功")
  async getReadHistory(@Request() req) {
    return new R({
      message: this.translation.t("prompt.acquire_successful"),
      data: await this.readHistoryService.getReadHistory(Number(req.user.userId))
    })
  }

  @Post(":bookId")
  @ApiOperation({ summary: "添加阅读历史" })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, "添加成功")
  async addReadHistory(@Request() req, @Param("bookId") bookId: number) {
    return new R({
      message: this.translation.t("prompt.added_successfully"),
      data: await this.readHistoryService.createReadHistory(Number(req.user.userId), Number(bookId))
    })
  }


  @Put(':bookId')
  @ApiOperation({ summary: "更新阅读历史" })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, "更新成功")
  async updateReadHistory(@Request() req, @Param("bookId") bookId: number) {
    return new R({
      message: this.translation.t("prompt.update_successful"),
      data: await this.readHistoryService.updateReadHistory(Number(req.user.userId), Number(bookId))
    })
  }
}
