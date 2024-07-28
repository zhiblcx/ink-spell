import { ApiProperty } from '@nestjs/swagger';

export class CoverLoadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
