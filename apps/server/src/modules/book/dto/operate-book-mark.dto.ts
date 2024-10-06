import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BookMarkDto } from './book-mark.dto';

export class OperateBookMarkDto extends PartialType(BookMarkDto) {
  @ApiProperty({
    example: 1,
    description: '收藏章节',
  })
  chapter: number;
}
