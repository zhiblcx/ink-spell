import { Controller, Delete, Get, Param, Put, Request } from '@nestjs/common';
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
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('profile')
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

  @Delete(':userId')
  @ApiOperation({ summary: '删除用户' })
  async deleteUser(@Param() userId: number) {
    console.log(userId);
  }

  @Put()
  @ApiOperation({ summary: '修改个人信息' })
  async updatePersonUserInfo(@Request() req) {
    console.log(req);
  }
}
