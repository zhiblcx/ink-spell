import { BookInfoVo } from '@/modules/book/vo/book.info.vo';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import dayjs from 'dayjs';

export class UserInfoVo {
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

  @ApiProperty({ example: "2024/11/26", description: "最近离线时间" })
  @Transform(({ value }) =>
    dayjs(value).isValid() ? dayjs(value).format('YYYY-MM-DD') : null,
  )
  offlineTime: string

  @ApiProperty({ example: 200, description: '上传的书籍的数量' })
  books: number;

  @ApiProperty({ example: 299, description: '关注的人数' })
  followers: number;

  @ApiProperty({ example: 199, description: '粉丝的人数' })
  following: number;

  @ApiProperty({
    example: [
      {
        id: 72,
        name: 'book',
        cover: null,
        protagonist: null,
        description: null,
        author: null,
        bookFile: '/static/book_file/1722266450547.txt',
        bookShelfId: 3,
        md5: '097e2a121d0e261a8db2522b6d413f71',
        encoding: 'UTF-8',
        position: 1,
      },
    ],
    description: '上传的书籍列表，数组类型',
  })
  booksInfo: BookInfoVo[];
}
