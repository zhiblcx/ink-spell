import { I18nTranslations } from '@/i18n/i18n.generated';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, NotContains } from 'class-validator';
import { i18nValidationMessage as t } from 'nestjs-i18n';

type I18n = I18nTranslations;

export class LoginDao {
  @IsNotEmpty({ message: t<I18n>('validation.account_cannot_be_empty') })
  @Length(6, 12, {
    message: t<I18n>('validation.account_must_be_length_characters_long', {
      length: '6-12',
    }),
  })
  @ApiProperty({
    example: 'nicole123',
    description: '账号',
  })
  account: string;

  @IsNotEmpty({
    message: t<I18n>('validation.password_cannot_be_empty'),
  })
  @NotContains(' ', {
    message: t<I18n>('validation.password_cannot_contain_spaces'),
  })
  @Length(6, 16, {
    message: t<I18n>('validation.password_must_be_length_characters_long', {
      length: '6-16',
    }),
  })
  @IsString({ message: t<I18n>('validation.password_must_be_a_string') })
  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  password: string;
}
