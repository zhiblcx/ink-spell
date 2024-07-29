import { appConfig } from '@/config/AppConfig';
import { FileValidationPipe } from '@/shared/pipe/ParseFilePipeBuilder';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
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
import { BookContentDto } from './dto/book.content.dto';
import { CoverLoadDto } from './dto/cover-load.dto';
import { Md5Dto } from './dto/md5.dto';
import { BookContentVo } from './vo/book.content.vo';
import { CoverVo } from './vo/cover.vo';
import { FileVo } from './vo/file.vo';
import { Md5Vo } from './vo/md5.vo';

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
    @Request() req,
    @UploadedFile()
    file: Express.Multer.File,
    @Body('md5') md5: string,
  ) {
    console.log(file, md5);
    if (await this.bookService.uploadFile(req, file, md5)) {
      return new FileVo({
        path: file.originalname,
        message: '上传成功',
      });
    }
  }

  @Get('md5')
  @ApiBearerAuth()
  @ApiOperation({ summary: '查询是否有重复的书籍' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '返回实例',
    type: Md5Vo,
  })
  async compareMd5(@Request() req, @Query() md5Dto: Md5Dto) {
    return new Md5Vo(await this.bookService.compareMd5(req, md5Dto.md5));
  }

  @Get(':bookID')
  @ApiBearerAuth()
  @ApiOperation({ summary: '查看书籍' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '返回实例',
    type: BookContentVo,
  })
  async showBookContent(@Param() bookContentDto: BookContentDto) {
    return await this.bookService.showBookContent(bookContentDto.bookID);
  }
}
