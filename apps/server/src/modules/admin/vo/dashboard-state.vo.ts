import { ApiProperty } from '@nestjs/swagger';

export class DashboardStateVo {
  @ApiProperty({
    example: 20,
    description: '注册用户数量',
  })
  userNumber: number;

  @ApiProperty({
    example: 30,
    description: "书架数量"
  })
  bookshelfNumber: number;

  @ApiProperty({
    example: 40,
    description: "书籍数量"
  })
  bookNumber: number

  @ApiProperty({
    example: [{ time: "2024/11/24", bookNumber: 20 }],
    description: "近七天上传的书籍数量"
  })
  bookNumberList: { time: string, bookNumber: number }[]

  @ApiProperty({
    example: [[1, 2], [2, 2], [3, 2], [4, 2], [5, 3]],
    description: "系统评分"
  })
  rateMap: Array<Array<number>>
}
