import { ApiProperty } from "@nestjs/swagger";
import { SystemAnnouncementVo } from "./system.announcement.vo";

export class SystemFeedbackVo extends SystemAnnouncementVo {
  @ApiProperty({
    example: "0",
    description: "1 已读  0 未读"
  })
  status: number
}

