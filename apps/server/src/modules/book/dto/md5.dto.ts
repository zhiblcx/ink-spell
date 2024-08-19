import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class Md5Dto {
  @IsNotEmpty({ message: 'md5不能为空' })
  @ApiProperty({
    example: 'f4c4bcc2bcfe2174f63335d52c7b0449',
    description: 'md5',
  })
  md5: string;

  @IsNotEmpty({ message: '书名不能为空' })
  @ApiProperty({
    example: '平凡的世界',
    description: '书名',
  })
  file_name: string;
}
