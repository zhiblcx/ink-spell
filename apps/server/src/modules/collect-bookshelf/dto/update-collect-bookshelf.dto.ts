import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectBookshelfDto } from './create-collect-bookshelf.dto';

export class UpdateCollectBookshelfDto extends PartialType(
  CreateCollectBookshelfDto,
) {}
