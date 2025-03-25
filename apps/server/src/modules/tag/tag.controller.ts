import { APIResponse } from '@/core/decorator/APIResponse';
import { Roles } from '@/core/decorator/roles.decorator';
import { limitQuery, pageQuery } from '@/shared/constants/pagination';
import {
  nameChineseQuery,
  nameEnglishQuery,
} from '@/shared/constants/tagQuery';
import { Role } from '@/shared/enums/role.enum';
import { E } from '@/shared/res/e';
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
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TranslationService } from '../translation/translation.service';
import { TagDto } from './dto/tag.dto';
import { TagService } from './tag.service';
import { TagVo } from './vo/tag.vo';

@Controller('tag')
@ApiTags('标签管理')
@ApiBearerAuth()
export class TagController {
  constructor(
    private readonly tagService: TagService,
    private readonly translation: TranslationService,
  ) {}

  @Get()
  @ApiOperation({ summary: '获取所有标签' })
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ ...pageQuery, required: false })
  @ApiQuery({ ...limitQuery, required: false })
  @ApiQuery(nameEnglishQuery)
  @ApiQuery(nameChineseQuery)
  @APIResponse([TagVo], '获取成功', true)
  async getTags(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('nameChinese') nameChinese?: string,
    @Query('nameEnglish') nameEnglish?: string,
  ) {
    if (page === undefined || limit === undefined) {
      return new R({
        message: this.translation.t('prompt.acquire_successful'),
        data: await this.tagService.getTags(),
      });
    } else {
      return new R({
        message: this.translation.t('prompt.acquire_successful'),
        data: new E({
          items: await this.tagService.getTags(
            Number(page),
            Number(limit),
            nameChinese,
            nameEnglish,
          ),
          currentPage: Number(page),
          itemsPerPage: Number(limit),
          totalPages: await this.tagService.getTotalPages(
            Number(limit),
            nameChinese,
            nameEnglish,
          ),
        }),
      });
    }
  }

  @Roles(Role.Admin)
  @Post()
  @ApiOperation({ summary: '添加标签' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(TagVo, '添加成功')
  async addTag(@Body() tag: TagDto) {
    return new R({
      message: this.translation.t('prompt.added_successfully'),
      data: await this.tagService.addTag(tag),
    });
  }

  @Roles(Role.Admin)
  @Put(':tagId')
  @ApiOperation({ summary: '更新标签' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(TagVo, '更新成功')
  async updateTag(@Param('tagId') tagId: number, @Body() tag: TagDto) {
    return new R({
      message: this.translation.t('prompt.update_successful'),
      data: await this.tagService.updateTag(Number(tagId), tag),
    });
  }

  @Roles(Role.Admin)
  @Delete(':tagId')
  @ApiOperation({ summary: '删除标签' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(TagVo, '删除成功')
  async deleteTag(@Param('tagId') tagId: number) {
    return new R({
      message: this.translation.t('prompt.deleted_successfully'),
      data: await this.tagService.deleteTag(Number(tagId)),
    });
  }
}
