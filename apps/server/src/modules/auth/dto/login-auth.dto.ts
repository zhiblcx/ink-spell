import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, NotContains } from 'class-validator';

export class LoginDao {
  @IsNotEmpty({ message: '账号不能为空' })
  @Length(6, 12, { message: '账号长度为 6-12 位' })
  @ApiProperty({
    example: 'nicole',
    description: '账号',
  })
  account: string;
  @IsNotEmpty({ message: '密码不能为空' })
  @NotContains('', { message: '密码不能有空格' })
  @Length(8, 16, { message: '密码长度为 8-16 位' })
  @IsString({ message: '密码必须为字符串' })
  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  password: string;
}
