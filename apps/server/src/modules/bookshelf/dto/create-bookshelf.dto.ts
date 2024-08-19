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

  // 书架的封面
  @IsString({ message: '书架封面必须为字符串' })
  @ApiProperty({
    example: 'https://example.com/cover.jpg',
    description: '书架封面',
  })
  bookShelfCover?: string;

  // 书架的描述
  @IsString({ message: '书架描述必须为字符串' })
  @ApiProperty({
    example: '这是一个末世的书架',
    description: '书架描述',
  })
  bookShelfDescription?: string;
}
