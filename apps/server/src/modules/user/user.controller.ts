import { APIResponse } from '@/core/decorator/APIResponse';
import { R } from '@/shared/res/r';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { UserInfoVo } from './vo/user.info.vo';
@Controller('user')
@ApiTags('用户管理')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('profile')
  @ApiOperation({ summary: '获取个人信息' })
  @APIResponse(UserInfoVo)
  async getProfile(@Request() req) {
    return new R({
      data: await this.userService.getProfile(req['user']),
    });
  }

  @Get(':userId')
  @ApiOperation({ summary: '获取指定用户信息' })
  @APIResponse(UserInfoVo)
  async getUserInfo(@Param('userId') userId: number) {
    return new R({
      data: await this.userService.getUserInfo(userId),
    });
  }

  @Delete(':userId')
  @ApiOperation({ summary: '删除用户' })
  @APIResponse(null, '删除成功')
  async deleteUser(@Param('userId') userId: number) {
    await this.userService.deleteUser(userId);
    return new R({
      message: '删除成功',
    });
  }

  @Put()
  @ApiOperation({ summary: '修改个人信息' })
  @APIResponse(UserInfoVo, '更新成功')
  async updatePersonUserInfo(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new R({
      message: '修改成功',
      data: await this.userService.updatePersonUserInfo(
        req.user.userId,
        updateUserDto,
      ),
    });
  }
}
