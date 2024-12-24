import { ApiProperty } from "@nestjs/swagger";

export class SystemAnnouncementVo {
  @ApiProperty({
    example: "1",
    description: "公告或反馈Id"
  })
  id: number;

  @ApiProperty({
    example: "默认重置密码为123456",
    description: "公告或反馈内容"
  })
  text: string

  @ApiProperty({
    example: "2024-10-17 23:46:38.977",
    description: "创建时间"
  })
  createTimer: string
}
