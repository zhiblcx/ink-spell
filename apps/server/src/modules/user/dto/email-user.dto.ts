import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class EmailPasswordDto {
  @IsEmail(undefined, { message: '邮箱格式不正确' })
  @ApiProperty({
    example: 'nicolezhi@qq.com',
    description: '邮箱',
    required: false,
  })
  email?: string;
}
