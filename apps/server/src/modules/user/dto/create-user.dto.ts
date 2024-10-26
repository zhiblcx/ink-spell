import { LoginDao } from '@/modules/auth/dto/login-auth.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { I18nTranslations } from '@/i18n/i18n.generated';
import { i18nValidationMessage as t } from 'nestjs-i18n';

type I18n = I18nTranslations;

export class CreateUserDto extends PartialType(LoginDao) {
  @IsString({ message: t<I18n>('validation.avatar_must_be_a_string') })
  @ApiProperty({
    example: '/static/cover/1723522466228.png',
    description: '头像',
  })
  avatar: string;
}
