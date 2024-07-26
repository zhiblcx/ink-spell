import { ApiProperty } from '@nestjs/swagger';
export class LoginVo {
  @ApiProperty({ example: 200 })
  code: number;
  @ApiProperty({ example: { access_token: '' } })
  data: object;
  @ApiProperty({ example: '登录成功' })
  message: string;
}
