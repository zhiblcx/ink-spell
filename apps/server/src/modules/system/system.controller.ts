import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Request } from '@nestjs/common';
import { SystemService } from './system.service';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { limitQuery, pageQuery } from '@/shared/constants/pagination';
import { APIResponse } from '@/core/decorator/APIResponse';
import { R } from '@/shared/res/r';
import { TranslationService } from '../translation/translation.service';
import { Roles } from '@/core/decorator/roles.decorator';
import { Role } from '@/shared/enums/role.enum';
import { SystemAnnouncementDto } from './dto/system.announcement.dto';
import { SystemFeedbackVo } from './vo/system.feedback.vo';
import { SystemAnnouncementVo } from './vo/system.announcement.vo';
import { SystemFeedbackDto } from './dto/system.feedback.dto';
import { E } from '@/shared/res/e';

@Controller('system')
@ApiTags('系统管理')
@ApiBearerAuth()
export class SystemController {
  constructor(
    private readonly systemService: SystemService,
    private readonly translation: TranslationService
  ) { }

  @Get('/announcement/user')
  @ApiOperation({ summary: "获取通知公告" })
  @HttpCode(HttpStatus.OK)
  @APIResponse(SystemAnnouncementVo, '获取成功')
  async getNotifyAnnouncement(@Request() req) {
    return new R({
      message: this.translation.t('prompt.acquire_successful'),
      data: await this.systemService.getNotifyAnnouncement(Number(req.user.userId))
    })
  }

  @Get("/announcement")
  @ApiOperation({ summary: '获取公告信息' })
  @HttpCode(HttpStatus.OK)
  @ApiQuery(pageQuery)
  @ApiQuery(limitQuery)
  @APIResponse([SystemAnnouncementVo], '获取成功', true)
  async getSystemAnnouncement(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const currentPage = Number(page)
    const currentLimit = Number(limit)
    return new R({
      message: this.translation.t('prompt.acquire_successful'),
      data: new E({
        items: await this.systemService.getSystemAnnouncement(currentPage, currentLimit),
        currentPage: currentPage,
        itemsPerPage: currentLimit,
        totalPages: await this.systemService.getSystemAnnouncementTotalPage(currentLimit),
      })
    })
  }

  @Roles(Role.Admin)
  @Get("/feedback")
  @ApiOperation({ summary: '获取反馈信息' })
  @HttpCode(HttpStatus.OK)
  @ApiQuery(pageQuery)
  @ApiQuery(limitQuery)
  @APIResponse([SystemAnnouncementVo], '获取成功', true)
  async getSystemFeedback(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const currentPage = Number(page)
    const currentLimit = Number(limit)
    return new R({
      message: this.translation.t('prompt.acquire_successful'),
      data: new E({
        items: await this.systemService.getSystemFeedback(currentPage, currentLimit),
        currentPage: currentPage,
        itemsPerPage: currentLimit,
        totalPages: await this.systemService.getSystemFeedbackTotalPage(currentLimit),
      })
    })
  }

  @Roles(Role.Admin)
  @Post("/announcement")
  @ApiOperation({ summary: '提交公告信息' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(SystemAnnouncementVo, '提交成功')
  async postSystemAnnouncement(@Request() req, @Body() systemAnnouncementDto: SystemAnnouncementDto) {
    return new R({
      message: this.translation.t('prompt.submit_successfully'),
      data: await this.systemService.postSystemAnnouncement(Number(req.user.userId), systemAnnouncementDto),
    })
  }

  @Post("/feedback")
  @ApiOperation({ summary: '提交反馈信息' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(SystemFeedbackVo, '提交成功')
  async postSystemFeedback(@Request() req, @Body() systemFeedbackDto: SystemFeedbackDto) {
    return new R({
      message: this.translation.t('prompt.submit_successfully'),
      data: await this.systemService.postSystemFeedback(Number(req.user.userId), systemFeedbackDto),
    })
  }

  @Put("/announcement/read/:id")
  @ApiOperation({ summary: '用户公告改为已读' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(SystemAnnouncementVo, '修改成功')
  async putSystemAnnouncementRead(@Param('id') id: number) {
    return new R({
      message: null,
      data: await this.systemService.putSystemAnnouncementRead(Number(id)),
    })
  }

  @Roles(Role.Admin)
  @Put('/announcement/:id')
  @ApiOperation({ summary: '修改公告信息' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, '修改成功')
  async putSystemAnnouncement(@Param('id') id: number, @Body() systemAnnouncementDto: SystemAnnouncementDto) {
    return new R({
      message: this.translation.t('prompt.submit_successfully'),
      data: await this.systemService.putSystemAnnouncement(Number(id), systemAnnouncementDto),
    })
  }

  @Roles(Role.Admin)
  @Delete('/announcement/:id')
  @ApiOperation({ summary: '删除公告或反馈信息' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, '删除成功')
  async deleteSystemAnnouncementAndFeedback(@Param('id') id: number) {
    return new R({
      message: this.translation.t('prompt.deleted_successfully'),
      data: await this.systemService.deleteSystemAnnouncementAndFeedback(Number(id)),
    })
  }

}
