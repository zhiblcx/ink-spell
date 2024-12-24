import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SystemAnnouncementDto } from './dto/system.announcement.dto';
import { SystemFeedbackDto } from './dto/system.feedback.dto';

@Injectable()
export class SystemService {
  constructor(private readonly prisma: PrismaService) { }
  async getNotifyAnnouncement(userId: number) {
    return await this.prisma.system.findFirst({
      where: {
        userId: userId,
        isDelete: false,
        type: 2
      },
      orderBy: {
        createTimer: "desc"
      }
    })
  }

  async getSystemAnnouncement(page: number, limit: number) {
    return await this.prisma.system.findMany({
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
    return await this.prisma.system.findMany({
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
    const result = await this.prisma.system.create({
      data: {
        text: systemAnnouncementDto.text,
        type: 1,
        userId: id
      }
    })
    const users = await this.prisma.user.findMany({
      where: {
        rolesId: 'user',
        isDelete: false
      }
    })

    const systemAnnouncements = users.map(user => ({
      text: systemAnnouncementDto.text,
      type: 2,
      userId: user.id
    }));
    await await this.prisma.system.createMany({ data: systemAnnouncements })
    return result
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
