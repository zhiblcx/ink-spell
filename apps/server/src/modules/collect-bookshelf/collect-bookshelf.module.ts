import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CollectBookshelfController } from './collect-bookshelf.controller';
import { CollectBookshelfService } from './collect-bookshelf.service';

@Module({
  imports: [PrismaModule],
  controllers: [CollectBookshelfController],
  providers: [CollectBookshelfService],
})
export class CollectBookshelfModule {}
