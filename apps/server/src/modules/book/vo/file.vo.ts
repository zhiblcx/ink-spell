import { ApiProperty } from '@nestjs/swagger';

export class FileVo {
  @ApiProperty({
    example: '/static/book/1722152856838.txt',
    description: '书籍的文件地址',
  })
  path: string;

  @ApiProperty({ example: '保存成功' })
  message: string;

  constructor(filevo: FileVo) {
    Object.assign(this, filevo);
  }
}
