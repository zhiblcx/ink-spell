import { ApiProperty } from '@nestjs/swagger';

export class SystemAnnouncementDto {
  @ApiProperty({
    example: '默认重置密码为123456',
    description: '公告',
  })
  text: string;
}
