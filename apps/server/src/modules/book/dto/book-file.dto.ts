import { ApiProperty } from '@nestjs/swagger';

export class BookFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty({
    type: 'string',
    example: 'f4c4bcc2bcfe2174f63335d52c7b0449',
    description: 'md5',
  })
  md5: string;
}
