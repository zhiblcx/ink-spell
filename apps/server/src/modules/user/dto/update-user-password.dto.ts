import { I18nTranslations } from '@/i18n/i18n.generated';
import { RegisterDto } from '@/modules/auth/dto/register-auth.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, Length, NotContains } from 'class-validator';
import { i18nValidationMessage as t } from 'nestjs-i18n';

type I18n = I18nTranslations;

export class UpdateUserPasswordDto extends PickType(RegisterDto, ['password']) {
  @NotContains(' ', {
    message: t<I18n>('validation.new_password_cannot_contain_spaces'),
  })
  @Length(6, 16, {
    message: t<I18n>('validation.new_password_must_be_length_characters_long', {
      length: '6-16',
    }),
  })
  @IsString({ message: t<I18n>('validation.new_password_must_be_a_string') })
  @ApiProperty({
    example: '456789',
    description: '密码',
  })
  newPassword: string;
}
