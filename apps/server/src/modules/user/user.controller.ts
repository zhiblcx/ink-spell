import { APIResponse } from '@/core/decorator/APIResponse';
import { E } from '@/shared/res/e';
import { R } from '@/shared/res/r';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBookShelfVo } from '../bookshelf/vo/create-bookshelf.vo';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { MessageVo } from './vo/message.vo';
import { UserInfoVo } from './vo/user.info.vo';
import { UserVo } from './vo/user.vo';
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

  @Get('/all/message')
  @ApiOperation({ summary: '获取聊天记录' })
  @APIResponse([MessageVo], '获取成功')
  async handleGetMessages() {
    return new R({
      message: '获取成功',
      data: await this.userService.handleGetMessages(),
    });
  }

  @Get('/username/:username')
  @ApiOperation({ summary: '通过用户名获取用户列表' })
  @ApiQuery({
    name: 'page',
    type: Number,
    example: 1,
    description: '页码',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    example: 10,
    description: '查询的条目',
  })
  @APIResponse([UserVo], '查询成功', true)
  async getUserInfoByUsername(
    @Param('username') username: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return new R({
      message: '获取成功',
      data: new E({
        items: await this.userService.getUserInfoByUsername(
          username,
          page,
          limit,
        ),
        currentPage: page,
        itemsPerPage: limit,
      }),
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

  @Get('/bookshelf/:userId')
  @ApiOperation({ summary: '获取该用户的公开书架' })
  @APIResponse([CreateBookShelfVo])
  async getBookshelf(@Param('userId') userId: number) {
    return new R({
      message: '获取成功',
      data: await this.userService.getBookshelf(userId),
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

  @Put('/password')
  @ApiOperation({ summary: '修改密码' })
  @APIResponse(null, '修改成功')
  async updatePassword(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.updatePassword(req.user.userId, updateUserDto);
    return new R({
      message: '修改成功',
    });
  }
}
