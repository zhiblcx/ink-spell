import { BookContentDto } from '@/modules/book/dto/book-content.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ReadHistoryVo {
  @ApiProperty({ example: 1, description: '阅读历史id' })
  id: number;


  @ApiProperty({ example: BookContentDto, description: "11" })
  book: BookContentDto;

  @ApiProperty({ example: "2024-08-25T11:51:10.149Z", description: "最近阅读的开始时间" })
  startTime: Date;

  @ApiProperty({ example: "2024-08-25T11:51:10.149Z", description: "最近阅读的结束时间" })
  endTime: Date;

  @ApiProperty({ example: 11, description: "阅读总时间" })
  readTime: number
}
