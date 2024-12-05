import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
import { i18nValidationMessage as t } from 'nestjs-i18n';
import { I18nTranslations } from '@/i18n/i18n.generated';

type I18n = I18nTranslations;
export class TagDto {

  @IsNotEmpty({
    message: t<I18n>('validation.password_cannot_be_empty'),
  })
  @IsString({ message: t<I18n>('validation.password_must_be_a_string') })
  @ApiProperty({ example: "重生", description: "中文标签" })
  nameChinese: string

  @IsNotEmpty({
    message: t<I18n>('validation.password_cannot_be_empty'),
  })
  @IsString({ message: t<I18n>('validation.password_must_be_a_string') })
  @ApiProperty({ example: "time loop", description: "英文标签" })
  nameEnglish: string

}
