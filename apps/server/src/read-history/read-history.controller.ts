import { Controller, Get, HttpCode, HttpStatus, Param, Put, Request } from '@nestjs/common';
import { ReadHistoryService } from './read-history.service';
import { TranslationService } from '@/modules/translation/translation.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { APIResponse } from '@/core/decorator/APIResponse';
import { R } from '@/shared/res/r';

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
  @APIResponse(null, "获取成功")
  async getReadHistory(@Request() req) {
    return new R({
      message: this.translation.t("prompt.acquire_successful"),
      data: await this.readHistoryService.getReadHistory(Number(req.user.userId))
    })
  }


  @Put(':readHistoryId')
  @ApiOperation({ summary: "更新阅读历史" })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, "更新成功")
  async updateReadHistory(@Param("readHistoryId") readHistoryId: number) {
    return new R({
      message: this.translation.t("prompt.update_successful"),
      data: await this.readHistoryService.updateReadHistory(Number(readHistoryId))
    })
  }
}
