import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, NotContains } from 'class-validator';

export class UpdateUserPasswordDto {
  @NotContains(' ', { message: '密码不能有空格' })
  @Length(6, 16, { message: '密码长度为 6-16 位' })
  @IsString({ message: '密码必须为字符串' })
  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  password: string;

  @NotContains(' ', { message: '密码不能有空格' })
  @Length(6, 16, { message: '密码长度为 6-16 位' })
  @IsString({ message: '密码必须为字符串' })
  @ApiProperty({
    example: '456789',
    description: '密码',
  })
  newPassword: string;
}
