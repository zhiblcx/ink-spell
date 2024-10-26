import { Global, Module } from '@nestjs/common';
import { TranslationService } from './translation.service';

@Global()
@Module({
  providers: [TranslationService],
  exports: [TranslationService],
})
export class TranslationModule {}
