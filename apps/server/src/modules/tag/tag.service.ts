import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TagDto } from './dto/tag.dto';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class TagService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transaction: TranslationService
  ) { }

  async getTags(page: number, limit: number, nameChinese: string | undefined, nameEnglish: string | undefined) {
    return await this.prisma.tag.findMany({
      where: {
        nameChinese: {
          contains: nameChinese ?? '',
        },
        nameEnglish: {
          contains: nameEnglish ?? '',
        },
        isDelete: false
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getTotalPages(limit: number, nameChinese: string | undefined, nameEnglish: string | undefined) {
    return Math.ceil((await this.prisma.tag.count({
      where: {
        nameChinese: {
          contains: nameChinese ?? '',
        },
        nameEnglish: {
          contains: nameEnglish ?? '',
        },
        isDelete: false
      },
    }) / limit))
  }

  async addTag(tag: TagDto) {
    const currentTag = await this.prisma.tag.findUnique({
      where: {
        nameChinese_nameEnglish: {
          nameChinese: tag.nameChinese,
          nameEnglish: tag.nameEnglish,
        },
      }
    })
    if (currentTag !== null) {
      return await this.prisma.tag.create({
        data: {
          nameChinese: tag.nameChinese,
          nameEnglish: tag.nameEnglish,
        }
      })
    } else if (currentTag.isDelete) {
      // 如果删除了
      return await this.prisma.tag.update({
        where: { id: currentTag.id, },
        data: { isDelete: true, createTimer: new Date() }
      })
    } else {
      // 没有删除，返回已有
      throw new UnprocessableEntityException(this.transaction.t('validation.tag_exists'))
    }

  }

  async updateTag(tagId: number, tag: TagDto) {
    return await this.prisma.tag.update({
      where: { id: tagId, },
      data: {
        nameChinese: tag.nameChinese,
        nameEnglish: tag.nameEnglish,
      }
    })
  }

  async deleteTag(tagId) {
    return await this.prisma.tag.update({
      where: { id: tagId, },
      data: { isDelete: true }
    })
  }
}
