import { ApiProperty } from '@nestjs/swagger';

export class BookMarkVo {
  @ApiProperty({
    example: [2, 4],
    description: '书签目录',
  })
  bookmark: Array<number>;
}
