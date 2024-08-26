import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import dayjs from 'dayjs';
import { UserInfoVo } from './user.info.vo';

export class MessageVo {
  @ApiProperty({ example: 1, description: '消息ID' })
  id: number;

  @ApiProperty({ example: '你好', description: '发送文本' })
  text: string;

  @ApiProperty({ example: '2024-08-25T11:51:10.149Z', description: '发送时间' })
  @Transform(({ value }) =>
    dayjs(value).isValid() ? dayjs(value).format('YYYY-MM-DD') : null,
  )
  createTimer: Date;

  @ApiProperty({ example: 1, description: '发送消息的用户ID' })
  userId: number;

  @ApiProperty({ example: 'join', description: '消息类型' })
  type: string;

  @ApiProperty({
    example: {
      id: 3,
      username: 'nicole',
      avatar: '/static/images/avatar.jpg',
      email: '******@qq.com',
      books: 3,
      followers: 2,
      following: 13,
    },
    description: '用户信息',
  })
  user: UserInfoVo;
}
