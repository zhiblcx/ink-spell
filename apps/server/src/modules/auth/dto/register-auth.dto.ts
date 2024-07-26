import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { LoginDao } from './login-auth.dto';

export class RegisterDto extends PartialType(LoginDao) {
  @Length(6, 12, { message: '用户名长度在 6-12 位' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @ApiProperty({
    example: 'nicole',
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
  email: string;
}
