import { I18nTranslations } from '@/i18n/i18n.generated';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
} from 'class-validator';
import { i18nValidationMessage as t } from 'nestjs-i18n';
import { LoginDao } from './login-auth.dto';

type I18n = I18nTranslations;

export class RegisterDto extends PartialType(LoginDao) {
  @ApiProperty({ required: true })
  account: string;

  @ApiProperty({ required: true })
  password: string;

  @Length(6, 12, {
    message: t<I18n>('validation.username_must_be_length_characters_long', {
      length: '6-12',
    }),
  })
  @IsNotEmpty({ message: t<I18n>('validation.username_cannot_be_empty') })
  @ApiProperty({
    example: 'nicole123',
    description: '用户名',
  })
  username: string;

  @IsEmail(undefined, { message: t<I18n>('validation.email_format_invalid') })
  @IsOptional()
  @ApiProperty({
    example: 'nicolezhi@qq.com',
    description: '邮箱',
    required: false,
  })
  email?: string;

  @Length(6, 6, {
    message: t<I18n>('validation.code_must_be_length_characters_long', {
      length: 6,
    }),
  })
  @IsNumber(undefined, { message: t<I18n>('validation.code_must_be_number') })
  @IsOptional()
  @ApiProperty({
    example: '123456',
    description: '验证码',
    required: false,
  })
  code?: string;
}
