import { ApiProperty } from '@nestjs/swagger';

export class CollectBookshelfVo {
  @ApiProperty({
    example: 1,
    description: '收藏夹ID',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: '用户ID',
  })
  userId: number;

  @ApiProperty({
    example: 1,
    description: '书架ID',
  })
  bookShelfId: number;
}
