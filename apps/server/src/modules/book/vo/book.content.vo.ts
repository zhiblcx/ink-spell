import { ApiProperty } from '@nestjs/swagger';

export class BookContentVo {
  @ApiProperty({
    example: ['简介', '第001章 恭喜您'],
    description: '目录',
  })
  directory: Array<string>;

  @ApiProperty({
    example: [
      ['内容1', '内容2'],
      ['内容1', '内容2'],
    ],
    description: '内容',
  })
  content: Array<Array<string>>;
}
