import { ApiPropertyOptional } from '@nestjs/swagger';

export class R<T = any> {
  @ApiPropertyOptional({ description: '提示信息', example: '请求成功' })
  message?: string;
  @ApiPropertyOptional({ description: '响应数据', type: () => Object })
  data?: T;

  constructor(r?: R<T>) {
    if (r.message === undefined) {
      this.message = '请求成功';
    }
    Object.assign(this, r);
  }
}
