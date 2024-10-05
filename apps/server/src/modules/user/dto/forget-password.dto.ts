import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, Length, NotContains } from 'class-validator';
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
}
