import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SystemAnnouncementDto } from './dto/system.announcement.dto';
import { SystemFeedbackDto } from './dto/system.feedback.dto';
import { SystemConstant } from '../../../../client/src/shared/constants/system';
import { Role } from '@/shared/enums/role.enum';

@Injectable()
export class SystemService {
  constructor(private readonly prisma: PrismaService) { }
  async getNotifyAnnouncement(userId: number) {
    return await this.prisma.system.findFirst({
      where: {
        userId: userId,
        isDelete: false,
        type: SystemConstant.type.USER_ANNOUNCEMENT
      },
      orderBy: {
        createTimer: "desc"
      }
    })
  }

  async getSystemAnnouncement(page: number, limit: number) {
    return await this.prisma.system.findMany({
      where: {
        type: SystemConstant.type.ANNOUNCEMENT,
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
        type: SystemConstant.type.FEEDBACK,
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
        type: SystemConstant.type.ANNOUNCEMENT,
        userId: id
      }
    })
    const users = await this.prisma.user.findMany({
      where: {
        rolesId: Role.User,
        isDelete: false
      }
    })

    const systemAnnouncements = users.map(user => ({
      text: systemAnnouncementDto.text,
      type: SystemConstant.type.USER_ANNOUNCEMENT,
      userId: user.id
    }));
    await await this.prisma.system.createMany({ data: systemAnnouncements })
    return result
  }

  async getSystemAnnouncementTotalPage(currentLimit: number) {
    return Math.ceil(await this.prisma.system.count({
      where: {
        type: SystemConstant.type.ANNOUNCEMENT,
        isDelete: false
      }
    }) / currentLimit)
  }

  async postSystemFeedback(id: number, systemFeedbackDto: SystemFeedbackDto) {
    return await this.prisma.system.create({
      data: {
        text: systemFeedbackDto.text,
        type: SystemConstant.type.FEEDBACK,
        userId: id
      }
    })
  }

  async putSystemAnnouncementRead(id: number) {
    return await this.prisma.system.update({
      where: { id },
      data: {
        status: SystemConstant.status.READ
      }
    })
  }

  async getSystemFeedbackTotalPage(currentLimit: number) {
    return Math.ceil(await this.prisma.system.count({
      where: {
        type: SystemConstant.type.FEEDBACK,
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
