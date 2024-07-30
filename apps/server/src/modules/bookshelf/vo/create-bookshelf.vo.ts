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
    example: '2024-07-30 14:38:00',
    description: '创建的日期',
  })
  @Transform(({ value }) =>
    dayjs(value).isValid() ? dayjs(value).format('YYYY-MM-DD') : null,
  )
  createTimer: Date;

  @ApiProperty({
    example: '1',
    description: '所属用户ID',
  })
  userId: number;

  @ApiProperty({
    example: true,
    description: '是否是默认书架',
  })
  allFlag: boolean;

  constructor(createBookShelfVo: CreateBookShelfVo) {
    Object.assign(this, createBookShelfVo);
  }
}
