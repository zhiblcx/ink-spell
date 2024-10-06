import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEmail, IsString, Length, NotContains } from 'class-validator';
import { UpdateUserPasswordDto } from './update-user-password.dto';

export class ForgetPasswordDto extends OmitType(UpdateUserPasswordDto, [
  'newPassword',
]) {
  @NotContains(' ', { message: '验证码不能有空格' })
  @Length(6, 6, { message: '验证码长度为 6 位' })
  @IsString({ message: '验证码必须为字符串' })
  @ApiProperty({
    example: '123456',
    description: '验证码',
  })
  code: string;

  @IsEmail(undefined, { message: '邮箱格式不正确' })
  @ApiProperty({
    example: 'nicolezhi@qq.com',
    description: '邮箱',
    required: false,
  })
  email: string;
}
