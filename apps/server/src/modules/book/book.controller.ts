import { appConfig } from '@/config/AppConfig';
import { APIResponse } from '@/core/decorator/APIResponse';
import { FileValidationPipe } from '@/core/pipe/ParseFilePipeBuilder';
import { R } from '@/shared/res/r';
import {
  Body,
  Controller,
  Delete,
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
@ApiBearerAuth()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('upload/cover')
  @ApiOperation({ summary: '上传图片' })
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '图片',
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
  @APIResponse(CoverVo, '上传成功')
  async uploadCover(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const filePath = file.path.replace(/\\/g, '/').replace('public', '/static');
    return new R({
      message: '上传成功',
      data: { filePath },
    });
  }

  @Post('upload/file')
  @ApiOperation({ summary: '上传书籍文件' })
  @HttpCode(HttpStatus.OK)
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
  @APIResponse(FileVo, '上传成功')
  async uploadFile(
    @Request() req,
    @UploadedFile()
    file: Express.Multer.File,
    @Body('md5') md5: string,
  ) {
    if (await this.bookService.uploadFile(req, file, md5)) {
      return new R({
        message: '上传成功',
        data: {
          path: file.originalname,
        },
      });
    }
  }

  @Get('md5')
  @ApiOperation({ summary: '查询是否有重复的书籍' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(Md5Vo)
  async compareMd5(@Request() req, @Query() md5Dto: Md5Dto) {
    return new R({
      data: await this.bookService.compareMd5(req, md5Dto.md5),
    });
  }

  @Delete(':bookID')
  @ApiOperation({ summary: '删除书籍' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, '删除成功')
  async deleteBook(@Param() bookContentDto: BookContentDto) {
    return new R({
      message: '删除成功',
      data: await this.bookService.deleteBook(bookContentDto.bookID),
    });
  }

  @Get(':bookID')
  @ApiOperation({ summary: '查看书籍' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(BookContentVo)
  async showBookContent(@Param() bookContentDto: BookContentDto) {
    return new R({
      message: '查询成功',
      data: await this.bookService.showBookContent(bookContentDto.bookID),
    });
  }
}
