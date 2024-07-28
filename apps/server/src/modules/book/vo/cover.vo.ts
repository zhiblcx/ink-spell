import { ApiProperty } from '@nestjs/swagger';

export class CoverVo {
  @ApiProperty({
    example: '/static/cover/1722152856838.jpg',
    description: '封面的地址',
  })
  path: string;
}
