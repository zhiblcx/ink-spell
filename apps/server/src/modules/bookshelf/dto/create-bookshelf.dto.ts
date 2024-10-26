import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { I18nTranslations } from '@/i18n/i18n.generated';
import { i18nValidationMessage as t } from 'nestjs-i18n';

type I18n = I18nTranslations;

export class CreateBookshelfDto {
  @IsString({ message: t<I18n>('validation.bookshelf_name_must_be_a_string') })
  @IsNotEmpty({ message: t<I18n>('validation.bookshelf_name_cannot_by_empty') })
  @ApiProperty({
    example: '末世',
    description: '书架名称',
  })
  bookShelfName: string;

  @ApiProperty({
    example: 1,
    description: '书架的位置',
  })
  position?: number;

  @ApiProperty({
    example: true,
    description: '书架是否公开',
  })
  status: boolean;

  // 书架的封面
  @ApiProperty({
    example: '/static/cover/1724232268171.jpg',
    description: '书架封面',
  })
  bookShelfCover?: string;

  // 书架的描述
  @ApiProperty({
    example: '这是一个末世的书架',
    description: '书架描述',
  })
  bookShelfDescription?: string;
}
