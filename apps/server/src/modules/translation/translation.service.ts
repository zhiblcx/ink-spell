import { I18nPath, I18nTranslations } from '@/i18n/i18n.generated';
import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class TranslationService {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {}

  t(key: I18nPath, options?: Record<string, any>): string {
    return this.i18n.t(key, { lang: I18nContext.current().lang, ...options });
  }
}
