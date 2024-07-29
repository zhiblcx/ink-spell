import { ApiProperty } from '@nestjs/swagger';

export class BookContentDto {
  @ApiProperty({
    example: '1',
    description: '书籍ID',
  })
  bookID: number;
}
