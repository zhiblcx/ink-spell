import { UserInfoType } from "@/modules/book/vo/all-book-info.vo";
import { BookInfoVo } from "@/modules/book/vo/book.info.vo";
import { ApiProperty } from "@nestjs/swagger";

export class AllBookShelfInfoVo extends BookInfoVo {
  @ApiProperty({
    example: {
      "id": 1,
      "username": "nicole",
      "account": "nicole123",
      "email": "15@q.com",
      "avatar": "/static/cover/1730468606152.jpg"
    }, description: "用户信息描述"
  })
  user: UserInfoType;

  @ApiProperty({ example: 0, description: "收藏人数" })
  collectBookShelfPeople: number;

  @ApiProperty({ example: 0, description: "书籍数量" })
  bookCount: number;
}
