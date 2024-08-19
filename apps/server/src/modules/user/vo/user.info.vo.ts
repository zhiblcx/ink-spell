import { ApiProperty } from '@nestjs/swagger';

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

  // @ApiProperty({
  //   example: [
  //     {
  //       id: 1,
  //       label: '长篇小说',
  //       createTimer: '2024/07/27 17:02:00',
  //       userId: 1,
  //       books: [
  //         {
  //           id: 1,
  //           bookShelfId: 1,
  //           name: '平凡的世界',
  //           protagonist: '[孙少安, 田润叶]',
  //           cover: '/static/images/123213t37123.png',
  //           bookFile: '/static/book_file/123213t37123.txt',
  //           md5: '',
  //           description:
  //             '该书以中国70年代中期到80年代中期十年间为背景，通过复杂的矛盾纠葛，以孙少安和孙少平两兄弟为中心，刻画了当时社会各阶层众多普通人的形象；劳动与爱情、挫折与追求、痛苦与欢乐、日常生活与巨大社会冲突纷繁地交织在一起，深刻地展示了普通人在大时代历史进程中所走过的艰难曲折的道路。',
  //         },
  //       ],
  //     },
  //   ],
  //   description: 'bookSehlfs',
  // })
  // bookSehlfs: Array<bookSehlfInfoVo>;
}
