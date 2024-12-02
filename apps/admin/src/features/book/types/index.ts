import { BookshelfType } from "@/shared/types/BookshelfType";
import { BookType } from "@/shared/types/BookType";
import { UserType } from "@/shared/types/UserType";

export interface BookDataVo extends BookType {
  user: UserType,
  bookShelf: BookshelfType,
}
