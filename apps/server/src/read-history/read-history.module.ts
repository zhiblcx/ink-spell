import { Module } from '@nestjs/common';
import { ReadHistoryService } from './read-history.service';
import { ReadHistoryController } from './read-history.controller';

@Module({
  controllers: [ReadHistoryController],
  providers: [ReadHistoryService],
})
export class ReadHistoryModule {}
