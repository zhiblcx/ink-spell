import { appConfig } from '@/config/AppConfig';
import { FileValidationPipe } from '@/shared/pipe/ParseFilePipeBuilder';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MultipleStorage } from 'src/config/MultipleStorage';
import { BookService } from './book.service';
import { BookFileDto } from './dto/book-file.dto';
import { CoverLoadDto } from './dto/cover-load.dto';
import { CoverVo } from './vo/cover.vo';
import { FileVo } from './vo/file.vo';

@Controller('book')
@ApiTags('书籍管理')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('upload/cover')
  @ApiBearerAuth()
  @ApiOperation({ summary: '上传封面' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '选择书的图片',
    type: CoverLoadDto,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      ...MultipleStorage(
        appConfig.IMAGE_SUPPORT_SUFFIX,
        appConfig.BOOK_COVER_URL,
      ),
    }),
  )
  @UsePipes(new FileValidationPipe(appConfig.COVER_MAX_FILE_SIZE))
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '返回示例',
    type: CoverVo,
  })
  async uploadCover(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const filePath = file.path.replace(/\\/g, '/').replace('public', '/static');
    return { filePath };
  }

  @Post('upload/file')
  @ApiBearerAuth()
  @ApiOperation({ summary: '上传书籍文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '选择书的文件',
    type: BookFileDto,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      ...MultipleStorage(appConfig.BOOK_FILE_SUFFIX, appConfig.BOOK_FILE_URL),
    }),
  )
  @UsePipes(new FileValidationPipe(appConfig.FILE_MAX_FILE_SIZE))
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '返回示例',
    type: FileVo,
  })
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const filePath = file.path.replace(/\\/g, '/').replace('public', '/static');
    this.bookService.uploadFile(filePath);
  }
}
