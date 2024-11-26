import { ApiProperty } from "@nestjs/swagger";
import { BookInfoVo } from "./book.info.vo";

export class AllBookInfoVo extends BookInfoVo {
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

  @ApiProperty({
    example: {
      "id": 25,
      "label": "111",
      "cover": "/static/images/cover.png",
      "description": "111",
      "isPublic": false
    }, description: "书架信息描述"
  })
  bookShelf: BookShelfInfoType
}

export interface UserInfoType {
  id: number;
  username: string,
  account: string,
  email: string,
  avatar: string
}

export interface BookShelfInfoType {
  id: number;
  label: string;
  cover: string,
  description: string;
  isPublic: boolean
}
