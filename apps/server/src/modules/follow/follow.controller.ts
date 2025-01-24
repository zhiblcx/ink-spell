import { APIResponse } from '@/core/decorator/APIResponse';
import { R } from '@/shared/res/r';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
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
import { TranslationService } from '../translation/translation.service';
import { FollowService } from './follow.service';
import { FollowVo } from './vo/follow.vo';
import { limitQuery, pageQuery } from '@/shared/constants/pagination';

@Controller('follow')
@ApiTags('关注管理')
@ApiBearerAuth()
export class FollowController {
  constructor(
    private readonly followService: FollowService,
    private readonly translation: TranslationService,
  ) { }
  @Get('/follower')
  @ApiOperation({ summary: '获取关注列表' })
  @HttpCode(HttpStatus.OK)
  @ApiQuery(pageQuery)
  @ApiQuery(limitQuery)
  @APIResponse([FollowVo], '获取成功', true)
  async getFollower(
    @Request() req,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.followService.getFollower(req.user.userId, page, limit);
  }

  @Get('/following')
  @ApiOperation({ summary: '获取粉丝列表' })
  @HttpCode(HttpStatus.OK)
  @ApiQuery(pageQuery)
  @ApiQuery(limitQuery)
  @APIResponse([FollowVo], '获取成功', true)
  async getFollowing(
    @Request() req,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.followService.getFollowing(req.user.userId, page, limit);
  }

  @Post(':userId')
  @ApiOperation({ summary: '关注用户' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(FollowVo, '关注成功')
  async follower(@Request() req, @Param('userId') userId: number) {
    return new R({
      message: this.translation.t('prompt.followed_successfully'),
      data: await this.followService.follower(req, userId),
    });
  }

  @Delete(':followID')
  @ApiOperation({ summary: '取消关注' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, '取消成功')
  async unFollower(@Request() req, @Param('followID') followID: number) {
    await this.followService.cancelFollower(req, followID);
    return new R({
      message: this.translation.t('prompt.cancellation_successful'),
    });
  }
}
