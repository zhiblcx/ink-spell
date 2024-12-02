import { BookshelfType } from "@/shared/types/BookshelfType";
import { UserType } from "@/shared/types/UserType";

export interface BookshelfDataVo extends BookshelfType {
  user: UserType,
  bookCount: number,
  collectBookShelfPeople: number
}
