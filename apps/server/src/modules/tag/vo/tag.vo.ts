import { TransformTimeUtils } from "@ink-spell/utils";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import dayjs from "dayjs";

export class TagVo {

  @ApiProperty({ example: 1, description: "标签id" })
  id: number

  @ApiProperty({ example: "重生", description: "中文标签" })
  nameChinese: string

  @ApiProperty({ example: "time loop", description: "英文标签" })
  nameEnglish: string

  @ApiProperty({ example: "2024-01-01 00:00:00", description: "标签创建时间" })
  @Transform(({ value }) =>
    dayjs(value).isValid() ? TransformTimeUtils.formatDateYMDHMS(dayjs(value)) : null,
  )
  createTime: string

}
