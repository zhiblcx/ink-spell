import { APIResponse } from '@/core/decorator/APIResponse';
import { Public } from '@/core/decorator/auth.decorator';
import { Roles } from '@/core/decorator/roles.decorator';
import { Role } from '@/shared/enums/role.enum';
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
import { ForgetPasswordEmailDto } from './dto/forget-password-email.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { RegisterEmailUserDto } from './dto/register-email-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { EmailVo } from './vo/email.vo';
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
  async updatePassword(
    @Request() req,
    @Body() updateUserDto: UpdateUserPasswordDto,
  ) {
    await this.userService.updatePassword(req.user.userId, updateUserDto);
    return new R({
      message: '修改成功',
    });
  }

  @Get('/user/all')
  @ApiOperation({ summary: '获取所有用户' })
  @APIResponse([UserVo], '获取成功', true)
  async getAllUser() {
    return new R({
      message: '获取成功',
      data: await this.userService.getAllUser(),
    });
  }

  @Public()
  @Get('/register/email')
  @ApiOperation({ summary: '注册，发送邮件' })
  @APIResponse(null, '发送成功')
  async sendEmail(@Query() registerEmailUserDto: RegisterEmailUserDto) {
    await this.userService.sendEmail(
      1,
      '[ink-spell]  注册邮箱请求 -- ',
      registerEmailUserDto.email,
    );
    return new R({
      message: '发送成功',
    });
  }

  @Public()
  @Get('/forget/password')
  @ApiOperation({ summary: '忘记密码，发送邮件' })
  @APIResponse(EmailVo, '发送成功')
  async forgetPassword(
    @Query() forgetPasswordEmailDto: ForgetPasswordEmailDto,
  ) {
    const email = await this.userService.sendEmail(
      0,
      '[ink-spell]  忘记密码请求 -- ',
      forgetPasswordEmailDto.account,
    );
    return new R({
      message: '发送成功',
      data: { email },
    });
  }

  @Public()
  @Put('/forget/password')
  @ApiOperation({ summary: '忘记密码，修改密码' })
  @APIResponse(null, '修改成功')
  async updateForgetPassword(@Body() forgetPassword: ForgetPasswordDto) {
    const { email, code, password } = { ...forgetPassword };
    await this.userService.updateForgetPassword(email, code, password);
    return new R({
      message: '修改成功',
    });
  }

  @Roles(Role.Admin)
  // 管理员重置用户密码
  @Put('/reset/password/:userId')
  @ApiOperation({ summary: '重置用户密码' })
  @APIResponse(null, '重置成功')
  async resetPassword(@Param('userId') userId: number) {
    await this.userService.resetPassword(userId, '123456');
    return new R({
      message: '重置成功',
      data: { password: '123456' },
    });
  }
}
