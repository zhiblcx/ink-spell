import { Controller, Get } from '@nestjs/common';
import { Public } from './shared/utils/setMetadata';

@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get()
  getHello(): string {
    return 'welcome ink-spell';
  }
}
