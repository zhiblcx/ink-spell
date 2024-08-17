import { ApiProperty } from '@nestjs/swagger';

export class CreateFollowDto {
  @ApiProperty({
    example: 2,
    description: '关注用户ID',
  })
  followId: number;
}
