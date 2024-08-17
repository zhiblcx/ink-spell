import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookshelfDto {
  @IsString({ message: '书架名称必须为字符串' })
  @IsNotEmpty({ message: '书架名称不能为空' })
  @ApiProperty({
    example: '末世',
    description: '书架名称',
  })
  bookShelfName: string;
}
