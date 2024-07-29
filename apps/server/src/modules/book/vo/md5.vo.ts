import { ApiProperty } from '@nestjs/swagger';

export class Md5Vo {
  @ApiProperty({
    example: 'true',
    description: '数据库是否已有该文件',
  })
  md5: boolean;
  @ApiProperty({
    example: '/static/book/1722152856838.txt',
    description: '数据库有该文件',
  })
  path: string;

  constructor(md5Vo: Md5Vo) {
    Object.assign(this, md5Vo);
  }
}
