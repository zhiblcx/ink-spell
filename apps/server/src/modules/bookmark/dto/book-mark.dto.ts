import { ApiProperty } from '@nestjs/swagger';

export class BookMarkDto {
  @ApiProperty({
    example: '1',
    description: '书本ID',
  })
  bookId: number;
}
