import { ApiProperty } from '@nestjs/swagger';
import { BookInfoVo } from 'src/modules/book/vo/book.info.vo';

export class BookShelfInfoVo {
  @ApiProperty({
    example: 1,
    description: '书架ID',
  })
  id: number;

  @ApiProperty({
    example: '长篇小说',
    description: '书架名称',
  })
  label: string;

  @ApiProperty({
    example: '2024/07/27 17:02:00',
    description: '书架的创建时间',
  })
  createTimer: string;

  @ApiProperty({
    example: 1,
    description: '用户ID',
  })
  userId: number;

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
    description: '书籍',
  })
  books: Array<BookInfoVo>;
}
