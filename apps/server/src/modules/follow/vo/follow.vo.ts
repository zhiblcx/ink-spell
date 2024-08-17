import { ApiProperty } from '@nestjs/swagger';

export class FollowVo {
  @ApiProperty({
    example: 1,
    description: 'ID',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: '用户ID',
  })
  userId: number;

  @ApiProperty({
    example: 2,
    description: '关注用户ID',
  })
  followId: number;

  @ApiProperty({
    example: false,
    description: '是否被删除',
  })
  isDelete: boolean;
}
