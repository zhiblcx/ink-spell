import { APIResponse } from '@/core/decorator/APIResponse';
import { E } from '@/shared/res/e';
import { R } from '@/shared/res/r';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FollowService } from './follow.service';
import { FollowVo } from './vo/follow.vo';

@Controller('follow')
@ApiTags('关注管理')
@ApiBearerAuth()
export class FollowController {
  constructor(private readonly followService: FollowService) {}
  @Get('/follower')
  @ApiOperation({ summary: '获取关注列表' })
  @HttpCode(HttpStatus.OK)
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
  @APIResponse([FollowVo], '获取成功', true)
  async getFollower(
    @Request() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const result = await this.followService.getFollower(
      req.user.userId,
      page,
      limit,
    );
    return new R({
      message: '获取成功',
      data: new E({
        items: result,
        currentPage: page,
        itemsPerPage: limit,
      }),
    });
  }

  @Get('/following')
  @ApiOperation({ summary: '获取粉丝列表' })
  @HttpCode(HttpStatus.OK)
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
  @APIResponse([FollowVo], '获取成功', true)
  async getFollowing(
    @Request() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const result = await this.followService.getFollowing(
      req.user.userId,
      page,
      limit,
    );
    return new R({
      message: '获取成功',
      data: new E({
        items: result,
        currentPage: page,
        itemsPerPage: limit,
      }),
    });
  }

  @Post(':userId')
  @ApiOperation({ summary: '关注用户' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(FollowVo, '关注成功')
  async follower(@Request() req, @Param('userId') userId: number) {
    return new R({
      message: '关注成功',
      data: await this.followService.follower(req, userId),
    });
  }

  @Delete(':followID')
  @ApiOperation({ summary: '取消关注' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, '取消成功')
  async unfollower(@Request() req, @Param('followID') followID: number) {
    await this.followService.cancelFollower(req, followID);
    return new R({
      message: '取消成功',
    });
  }
}
