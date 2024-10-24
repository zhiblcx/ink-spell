import { ApiProperty } from '@nestjs/swagger';
export class LoginVo {
  @ApiProperty({
    example: '',
    description: 'access_token',
  })
  access_token: string;

  @ApiProperty({
    example: '',
    description: 'refresh_token',
  })
  refresh_token: string;

  constructor(loginVo: LoginVo) {
    Object.assign(this, loginVo);
  }
}
