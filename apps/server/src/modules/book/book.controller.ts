import { appConfig } from '@/config/AppConfig';
import { APIResponse } from '@/core/decorator/APIResponse';
import { FileValidationPipe } from '@/core/pipe/ParseFilePipeBuilder';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  Res,
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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MultipleStorage } from 'src/config/MultipleStorage';
import { TranslationService } from '../translation/translation.service';
import { BookService } from './book.service';
import { BookContentDto, BookFileDto, CoverLoadDto, Md5Dto } from './dto';
import { BookContentVo, BookInfoVo, CoverVo, FileVo, Md5Vo, AllBookInfoVo } from './vo';
import { Roles } from '@/core/decorator/roles.decorator';
import { Role } from '@/shared/enums/role.enum';
import { E, R } from '@/shared/res';
import { bookshelfNameQuery, limitQuery, pageQuery, usernameQuery } from '@/shared/constants/pagination';

@Controller('book')
@ApiTags('书籍管理')
@ApiBearerAuth()
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly translation: TranslationService,
  ) { }

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
      message: this.translation.t('prompt.upload_successful'),
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
    @Body() data: { md5: string; bookShelfId: number },
  ) {
    if (
      await this.bookService.uploadFile(req, file, data.md5, data.bookShelfId)
    ) {
      return new R({
        message: this.translation.t('prompt.upload_successful'),
        data: {
          path: file.originalname,
        },
      });
    }
  }

  @Post(':bookID')
  @ApiOperation({ summary: '收藏书籍' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, '收藏成功')
  async collectBook(@Request() req, @Param('bookID', ParseIntPipe) bookID: number) {
    return new R({
      message: this.translation.t('prompt.collection_successful'),
      data: await this.bookService.collectBook(Number(req.user.userId), bookID),
    });
  }

  @Get('md5')
  @ApiOperation({ summary: '查询是否有重复的书籍' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(Md5Vo)
  async compareMd5(@Request() req, @Query() md5Dto: Md5Dto) {
    const file_name = md5Dto.file_name.split('.')[0];
    return new R({
      data: await this.bookService.compareMd5(req, md5Dto.md5, file_name),
    });
  }

  @Delete(':bookID')
  @ApiOperation({ summary: '删除书籍' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, '删除成功')
  async deleteBook(@Param('bookID', ParseIntPipe) bookID: number) {
    return new R({
      message: this.translation.t('prompt.deleted_successfully'),
      data: await this.bookService.deleteBook(bookID),
    });
  }

  @Get(':bookID')
  @ApiOperation({ summary: '查看书籍' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(BookContentVo, '获取成功')
  async showBookContent(@Param('bookID', ParseIntPipe) bookID: number) {
    return new R({
      message: this.translation.t('prompt.acquire_successful'),
      data: await this.bookService.showBookContent(Number(bookID)),
    });
  }

  @Put(':bookID')
  @ApiOperation({ summary: '修改书籍' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(BookInfoVo, '更新成功')
  async updateBookDescription(
    @Param('bookID', ParseIntPipe) bookID: number,
    @Body() bookContentDto: BookContentDto,
  ) {
    return new R({
      message: this.translation.t('prompt.update_successful'),
      data: await this.bookService.updateBookDescription(
        bookID,
        bookContentDto,
      ),
    });
  }

  @Get("/download/:bookID")
  @ApiOperation({ summary: '下载书籍' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, '下载成功')
  async downloadBook(@Param('bookID') bookID: number, @Res() res,) {
    const fileName = await this.bookService.downloadBook(Number(bookID))
    const suffix = '.txt'
    res.download(appConfig.BOOK_FILE_URL + '\\' + fileName, new Date().valueOf() + suffix)
  }

  @Roles(Role.Admin)
  @Get('/all/info')
  @ApiOperation({ summary: '获取所有书籍信息' })
  @ApiQuery(pageQuery)
  @ApiQuery(limitQuery)
  @ApiQuery(usernameQuery)
  @ApiQuery(bookshelfNameQuery)
  @APIResponse([AllBookInfoVo], '查询成功', true)
  async getAllBookInfo(
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number,
    @Query("username") username: string,
    @Query("bookshelfName") bookshelfName: string,
  ) {
    return new R({
      message: this.translation.t("prompt.acquire_successful"),
      data: new E({
        items: await this.bookService.getAllBookInfo(
          page,
          limit,
          username,
          bookshelfName
        ),
        totalPages: await this.bookService.getAllBookInfoCount(limit, username, bookshelfName),
        currentPage: page,
        itemsPerPage: limit,
      })
    })
  }
}
