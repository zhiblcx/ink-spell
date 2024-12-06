import { TagVo } from '@/modules/tag/vo/tag.vo';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import * as dayjs from 'dayjs';

export class CreateBookShelfVo {
  @ApiProperty({
    example: '1',
    description: '书架ID',
  })
  id: number;

  @ApiProperty({
    example: '末世',
    description: '书架名称',
  })
  label: string;

  @ApiProperty({
    example: '2024-07-30',
    description: '创建的日期',
  })
  @Transform(({ value }) =>
    dayjs(value).isValid() ? dayjs(value).format('YYYY-MM-DD') : null,
  )
  createTimer: Date;

  @ApiProperty({
    example: 1,
    description: '所属用户ID',
  })
  userId: number;

  @ApiProperty({
    example: true,
    description: '是否是默认书架',
  })
  allFlag: boolean;

  @ApiProperty({
    example: 1,
    description: '位置',
  })
  position: number;

  @ApiProperty({
    example: true,
    description: '书架是否公开',
  })
  isPublic: boolean;

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

  // 书架的标签
  @ApiProperty({
    example: [
      {
        "id": 19,
        "nameChinese": "历史",
        "nameEnglish": "History",
        "createTimer": "2024-12-06T01:00:26.066Z",
        "isDelete": false
      },
    ],
    description: "书架的标签"
  })
  tags?: TagVo

  constructor(createBookShelfVo: CreateBookShelfVo) {
    Object.assign(this, createBookShelfVo);
  }
}
