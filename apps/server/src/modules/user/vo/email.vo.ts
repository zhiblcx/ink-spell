import { ApiProperty } from '@nestjs/swagger';

export class EmailVo {
  @ApiProperty({ example: 'xxxx@qq.com', description: '邮箱' })
  email: string;
}
