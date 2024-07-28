import { ApiProperty } from '@nestjs/swagger';

export class BookFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
