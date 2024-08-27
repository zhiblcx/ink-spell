import { ApiProperty } from '@nestjs/swagger';

export class UserVo {
  @ApiProperty({ example: 1, description: 'ID' })
  id: number;

  @ApiProperty({ example: 'nicole', description: '用户名' })
  username: string;

  @ApiProperty({ example: 'nicole123', description: '账号' })
  account: string;

  @ApiProperty({ example: '女', description: '性别' })
  sex: string;

  @ApiProperty({
    example: 'nicolezhi@qq.com',
    description: '邮箱',
    required: false,
  })
  email?: string;

  @ApiProperty({ example: '/static/images/avatar.png', description: '头像' })
  avatar: string;

  @ApiProperty({ example: 200, description: '上传的书籍的数量' })
  books: number;

  @ApiProperty({ example: 299, description: '关注的人数' })
  followers: number;

  @ApiProperty({ example: 199, description: '粉丝的人数' })
  following: number;
}
