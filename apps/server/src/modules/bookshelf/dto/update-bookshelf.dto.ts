import { PartialType } from '@nestjs/swagger';
import { CreateBookshelfDto } from './create-bookshelf.dto';

export class UpdateBookshelfDto extends PartialType(CreateBookshelfDto) {}
