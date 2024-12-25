import { appConfig } from '@/config/AppConfig';
import { APIResponse } from '@/core/decorator/APIResponse';
import { R } from '@/shared/res/r';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import * as fs from 'node:fs';
import { TranslationService } from '../translation/translation.service';
import { BookshelfService } from './bookshelf.service';
import { CreateBookshelfDto } from './dto/create-bookshelf.dto';
import { BookShelfInfoVo } from './vo/bookshelf.info.vo';
import { CreateBookShelfVo } from './vo/create-bookshelf.vo';
import { Roles } from '@/core/decorator/roles.decorator';
import { Role } from '@/shared/enums/role.enum';
import { E } from '@/shared/res/e';
import { AllBookShelfInfoVo } from './vo/all-bookshelf-info.vo';
import { bookshelfNameQuery, limitQuery, pageQuery, usernameQuery } from '@/shared/constants/pagination'
import { tagsIdQuery, } from '@/shared/constants/tagQuery';

@Controller('bookshelf')
@ApiTags('书架管理')
@ApiBearerAuth()
export class BookshelfController {
  constructor(
    private readonly bookshelfService: BookshelfService,
    private readonly translation: TranslationService,
  ) { }

  @Post()
  @ApiOperation({ summary: '新增书架' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(CreateBookShelfVo)
  async createBookShelf(
    @Request() req,
    @Body() createBookshelfDto: CreateBookshelfDto,
  ) {
    const result = await this.bookshelfService.createBookShelf(
      req,
      createBookshelfDto,
    );
    if (result == undefined) {
      return new R({
        message: this.translation.t('validation.bookshelf_name_taken'),
      });
    } else {
      return new R({
        message: this.translation.t('prompt.added_successfully'),
        data: new CreateBookShelfVo(result),
      });
    }
  }

  @Delete(':bookShelfId')
  @ApiOperation({ summary: '删除书架' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, '删除成功')
  async deleteBookShelf(@Param('bookShelfId') bookShelfId: number) {
    await this.bookshelfService.deleteBookShelf(bookShelfId);
    return new R({
      message: this.translation.t('prompt.deleted_successfully'),
    });
  }

  @Get()
  @ApiOperation({ summary: '查询书架' })
  @HttpCode(HttpStatus.OK)
  @APIResponse([CreateBookShelfVo], '获取成功')
  async acquireBookShelf(@Request() req) {
    return new R({
      message: this.translation.t('prompt.acquire_successful'),
      data: await this.bookshelfService.acquireBookShelf(req.user.userId),
    });
  }

  // #region Public Bookshelf API
  @Get("/public")
  @ApiOperation({ summary: '查询以及搜索公开书架' })
  @HttpCode(HttpStatus.OK)
  @ApiQuery(pageQuery)
  @ApiQuery(limitQuery)
  @ApiQuery(bookshelfNameQuery)
  @ApiQuery(tagsIdQuery)
  @APIResponse([CreateBookShelfVo], '获取成功')
  async acquirePublicBookShelf(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query('bookshelfName') bookshelfName?: string,
    @Query('tagsId') tagsId?: string,
  ) {
    return new R({
      message: this.translation.t('prompt.acquire_successful'),
      data: new E({
        items: await this.bookshelfService.acquirePublicBookShelf(
          Number(page),
          Number(limit),
          bookshelfName,
          tagsId,
        ),
        currentPage: Number(page),
        itemsPerPage: Number(limit),
        totalPages: await this.bookshelfService.getPublicBookShelfCount(
          limit,
          bookshelfName,
          tagsId
        )
      })
    });
  }
  // #endregion

  @Get('/download/:bookShelfId')
  @ApiOperation({ summary: '下载书架书籍笔记' })
  @HttpCode(HttpStatus.OK)
  async downloadBookShelf(
    @Param('bookShelfId') bookShelfId: number,
    @Res() res,
  ) {
    const data =
      await this.bookshelfService.acquireBookShelfByBookShelfId(bookShelfId);
    const filePath = appConfig.DEFAULT_NOTES_URL;
    const fileName = `${bookShelfId}.txt`;
    let content = '';
    for (let i = 0; i < data.length; i++) {
      content += `${data[i].name || this.translation.t('prompt.no_book_title')}\n`;
      content += `${this.translation.t('common.author')}：${data[i].author || this.translation.t('prompt.no_author')}\n`;
      content += `${this.translation.t('common.main_character')}：${data[i].protagonist || this.translation.t('prompt.no_main_character')}\n`;
      content += `${this.translation.t('common.description')}：${data[i].description || this.translation.t('prompt.no_description')}\n\n`;
    }

    fs.writeFile(filePath + fileName, content, (err) => {
      if (err) {
        throw new BadRequestException(
          this.translation.t('prompt.note_download_failed'),
        );
      } else {
        res.download(filePath + fileName, new Date().valueOf() + '.txt');
      }
    });
  }

  @Get(':bookShelfId')
  @ApiOperation({ summary: '查询书架书本' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(BookShelfInfoVo, '获取成功')
  async acquireBookShelfByBookShelfId(
    @Param('bookShelfId') bookShelfId: number,
  ) {
    return new R({
      message: this.translation.t('prompt.acquire_successful'),
      data: await this.bookshelfService.acquireBookShelfByBookShelfId(
        bookShelfId,
      ),
    });
  }

  @Put(':bookShelfId')
  @ApiOperation({ summary: '更新书架' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(CreateBookShelfVo, '更新成功')
  async updateBookShelf(
    @Param('bookShelfId') bookShelfId: number,
    @Body() updateBookshelfDto: CreateBookshelfDto,
  ) {
    return new R({
      message: this.translation.t('prompt.update_successful'),
      data: await this.bookshelfService.updateBookShelf(
        bookShelfId,
        updateBookshelfDto,
      ),
    });
  }

  @Roles(Role.Admin)
  @Get("/all/info")
  @ApiOperation({ summary: "获取所有书架信息" })
  @ApiQuery(usernameQuery)
  @ApiQuery(bookshelfNameQuery)
  @ApiQuery(pageQuery)
  @ApiQuery(limitQuery)
  @APIResponse([AllBookShelfInfoVo], '查询成功', true)
  async getAllBookInfo(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("username") username?: string,
    @Query("bookshelfName") bookshelfName?: string,
  ) {
    return new R({
      message: this.translation.t("prompt.acquire_successful"),
      data: new E({
        items: await this.bookshelfService.getAllBookInfo(
          Number(page),
          Number(limit),
          username,
          bookshelfName
        ),
        totalPages: await this.bookshelfService.getAllBookInfoCount(limit, username,
          bookshelfName),
        currentPage: Number(page),
        itemsPerPage: Number(limit),
      })
    })
  }
}
