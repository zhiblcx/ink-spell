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

  @ApiProperty({
    example: 1,
    description: '书架的位置',
  })
  position?: number;

  @ApiProperty({
    example: true,
    description: '书架是否公开',
  })
  status: boolean;

  // 书架的封面
  @ApiProperty({
    example: '/static/cover/1724232268171.jpg',
    description: '书架封面',
  })
  bookShelfCover?: string;

  // 书架的描述
  @ApiProperty({
    example: '这是一个末世的书架',
    description: '书架描述',
  })
  bookShelfDescription?: string;
}
