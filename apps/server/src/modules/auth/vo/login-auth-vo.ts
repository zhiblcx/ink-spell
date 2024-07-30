import { ApiProperty } from '@nestjs/swagger';
export class LoginVo {
  @ApiProperty({
    example: '',
    description: 'token',
  })
  access_token: string;

  constructor(loginvo: LoginVo) {
    Object.assign(this, loginvo);
  }
}
