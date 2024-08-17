import { APIResponse } from '@/core/decorator/APIResponse';
import { R } from '@/shared/res/r';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFollowDto } from './dto/create-follow.dto';
import { FollowService } from './follow.service';
import { FollowVo } from './vo/follow.vo';

@Controller('follow')
@ApiTags('关注管理')
@ApiBearerAuth()
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post('/follower')
  @ApiOperation({ summary: '关注用户' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(FollowVo, '关注成功')
  async follower(@Request() req, @Body() createFollowDto: CreateFollowDto) {
    return new R({
      message: '关注成功',
      data: await this.followService.follower(req, createFollowDto),
    });
  }

  @Delete('followID')
  @ApiOperation({ summary: '取消关注' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(FollowVo, '取消成功')
  async unfollower(@Request() req, @Body() createFollowDto: CreateFollowDto) {
    return new R({
      message: '取消成功',
      data: await this.followService.cancelFollower(req, createFollowDto),
    });
  }
}
