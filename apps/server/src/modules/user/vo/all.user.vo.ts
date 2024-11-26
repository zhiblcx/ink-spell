import { ApiProperty } from "@nestjs/swagger";
import { UserVo } from "./user.vo";

export class AllUserVo extends UserVo {
  @ApiProperty({ example: 2, description: "阅读时长(分钟)" })
  readTime: number;

  @ApiProperty({ example: 2, description: "上传书架数量" })
  bookShelfs: number;
}
