import { Controller } from '@nestjs/common';
import { BookshelfService } from './bookshelf.service';

@Controller('bookshelf')
export class BookshelfController {
  constructor(private readonly bookshelfService: BookshelfService) {}
}
