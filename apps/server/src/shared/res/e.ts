import { ApiPropertyOptional } from '@nestjs/swagger';

export class E<T = any> {
  @ApiPropertyOptional({ description: '数据', example: [] })
  items?: T;
  @ApiPropertyOptional({ description: '总条目数', example: 0 })
  totalItems?: number;
  @ApiPropertyOptional({ description: '总页数', example: 0 })
  totalPages?: number;
  @ApiPropertyOptional({ description: '当前页数', example: 0 })
  currentPage?: number;
  @ApiPropertyOptional({ description: '每页显示的条目', example: 0 })
  itemsPerPage?: number;

  constructor(e?: E<T>) {
    Object.assign(this, e);
  }
}
