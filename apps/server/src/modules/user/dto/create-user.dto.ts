import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  NotContains,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '账号不能为空' })
  @Length(6, 12, { message: '账号长度为 6-12 位' })
  @ApiProperty({
    example: 'nicole123',
    description: '账号',
  })
  account: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @NotContains(' ', { message: '密码不能有空格' })
  @Length(6, 16, { message: '密码长度为 6-16 位' })
  @IsString({ message: '密码必须为字符串' })
  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  password: string;

  @Length(6, 12, { message: '用户名长度在 3-12 位' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @ApiProperty({
    example: 'nicole123',
    description: '用户名',
    required: true,
  })
  username: string;

  @IsEmail(undefined, { message: '邮箱格式不正确' })
  @ApiProperty({
    example: 'nicolezhi@qq.com',
    description: '邮箱',
    required: false,
  })
  email?: string;

  @IsString({ message: '必须为字符串' })
  @ApiProperty({
    example: '',
    description: '头像',
  })
  avatar: string;
}
