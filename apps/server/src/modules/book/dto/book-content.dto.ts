import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BookContentDto {
  @ApiProperty({
    example: '1',
    description: '书本ID',
  })
  id: number;

  @ApiProperty({
    example: '平凡的世界',
    description: '书名',
  })
  name?: string;

  @ApiProperty({
    example: '/static/cover/1722152856838.jpg',
    description: '书的封面',
  })
  cover?: string;

  @ApiProperty({
    example: '路遥',
    description: '作者',
  })
  author?: string;

  @ApiProperty({ example: '孙少安,田润叶', description: '主角' })
  protagonist?: string;

  @ApiProperty({
    example:
      '该书以中国70年代中期到80年代中期十年间为背景，通过复杂的矛盾纠葛，以孙少安和孙少平两兄弟为中心，刻画了当时社会各阶层众多普通人的形象；劳动与爱情、挫折与追求、痛苦与欢乐、日常生活与巨大社会冲突纷繁地交织在一起，深刻地展示了普通人在大时代历史进程中所走过的艰难曲折的道路。',
    description: '简介',
  })
  description?: string;

  @ApiProperty({
    example: '1',
    description: '书架ID',
  })
  @IsNumber()
  bookShelfId: number;
}
