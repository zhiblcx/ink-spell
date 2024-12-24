import { ApiProperty } from '@nestjs/swagger';

export class SystemFeedbackDto {
  @ApiProperty({
    example: '添加"武侠"类型',
    description: '反馈信息',
  })
  text: string;
}
