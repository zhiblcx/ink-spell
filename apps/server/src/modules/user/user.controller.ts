import { Controller, Get, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserInfoVo } from './vo/user.info.vo';
@Controller('user')
@ApiTags('用户管理')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取个人信息' })
  @ApiResponse({
    status: 200,
    description: '返回示例',
    type: UserInfoVo,
  })
  async getProfile(@Request() req) {
    const user = this.userService.getProfile(req['user']);
    return user;
  }
}
