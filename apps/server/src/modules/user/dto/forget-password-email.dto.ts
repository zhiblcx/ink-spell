import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class ForgetPasswordEmailDto {
  @IsNotEmpty({ message: '账号不能为空' })
  @Length(6, 12, { message: '账号长度为 6-12 位' })
  @ApiProperty({
    example: 'nicole123',
    description: '账号',
  })
  account: string;
}
