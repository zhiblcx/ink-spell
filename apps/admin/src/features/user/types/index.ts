import { BookType } from "@/shared/types/BookType";
import { UserType } from "@/shared/types/UserType";

export interface UserDataVo extends UserType {
  bookShelfs: number;
}

export interface ReadHistoryDataVo extends UserType {
  book: BookType
}
