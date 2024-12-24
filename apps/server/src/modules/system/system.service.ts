import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SystemAnnouncementDto } from './dto/system.announcement.dto';
import { SystemFeedbackDto } from './dto/system.feedback.dto';

@Injectable()
export class SystemService {
  constructor(private readonly prisma: PrismaService) { }
  async getSystemAnnouncement(page: number, limit: number) {
    return this.prisma.system.findMany({
      where: {
        type: 1,
        isDelete: false
      },
      orderBy: {
        createTimer: "desc"
      },
      skip: (page - 1) * limit,
      take: limit
    })
  }

  async getSystemFeedback(page: number, limit: number) {
    return this.prisma.system.findMany({
      where: {
        type: 0,
        isDelete: false
      },
      orderBy: {
        createTimer: "desc"
      },
      skip: (page - 1) * limit,
      take: limit
    })
  }

  async postSystemAnnouncement(id: number, systemAnnouncementDto: SystemAnnouncementDto) {
    return await this.prisma.system.create({
      data: {
        text: systemAnnouncementDto.text,
        type: 1,
        userId: id
      }
    })
  }

  async getSystemAnnouncementTotalPage(currentLimit: number) {
    return Math.ceil(await this.prisma.system.count({
      where: {
        type: 1,
        isDelete: false
      }
    }) / currentLimit)
  }

  async postSystemFeedback(id: number, systemFeedbackDto: SystemFeedbackDto) {
    return await this.prisma.system.create({
      data: {
        text: systemFeedbackDto.text,
        type: 0,
        userId: id
      }
    })
  }

  async getSystemFeedbackTotalPage(currentLimit: number) {
    return Math.ceil(await this.prisma.system.count({
      where: {
        type: 0,
        isDelete: false
      }
    }) / currentLimit)
  }

  async putSystemAnnouncement(id: number, systemAnnouncementDto: SystemAnnouncementDto) {
    return await this.prisma.system.update({
      where: {
        id: id
      },
      data: {
        text: systemAnnouncementDto.text
      }
    })
  }

  async deleteSystemAnnouncementAndFeedback(id: number) {
    return await this.prisma.system.update({ where: { id }, data: { isDelete: true } })
  }
}
