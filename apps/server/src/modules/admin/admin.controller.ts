import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { APIResponse } from '@/core/decorator/APIResponse';
import { DashboardStateVo } from './vo/dashboard-state.vo';
import { R } from '@/shared/res/r';
import { Roles } from '@/core/decorator/roles.decorator';
import { Role } from '@/shared/enums/role.enum';
import { TranslationService } from '../translation/translation.service';

@Controller('admin')
@ApiTags("其他管理")
@ApiBearerAuth()
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly translation: TranslationService
  ) { }

  // 获取用户数量，书籍数量，书架数量，近七天书籍上传量
  @Roles(Role.Admin)
  @Get("dashboard-state")
  @ApiOperation({ summary: "获取用户数量，书籍数量，书架数量，近七天书籍上传量，系统评分" })
  @HttpCode(HttpStatus.OK)
  @APIResponse(DashboardStateVo, '获取成功')
  async getDashboardState() {
    return new R({
      message: "获取成功",
      data: await this.adminService.getDashboardState()
    })
  }
}
