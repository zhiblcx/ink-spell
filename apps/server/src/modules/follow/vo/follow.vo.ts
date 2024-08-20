import { UserInfoVo } from '@/modules/user/vo/user.info.vo';
import { ApiProperty } from '@nestjs/swagger';

export class FollowVo {
  @ApiProperty({
    example: 1,
    description: 'ID',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: '粉丝用户ID',
  })
  followingId: number;

  @ApiProperty({
    example: 2,
    description: '关注用户ID',
  })
  followerId: number;

  @ApiProperty({
    example: UserInfoVo,
    description: '关注用户信息',
  })
  followUser: UserInfoVo;

  @ApiProperty({
    example: UserInfoVo,
    description: '粉丝用户信息',
  })
  followingUser: UserInfoVo;

  @ApiProperty({
    example: true,
    description: '是否互相关注',
  })
  isMutual: boolean;
}
