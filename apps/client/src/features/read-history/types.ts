import { Book } from "@/shared/types";

export interface ReadHistoryVo {
  id: number;
  startTime: Date;
  endTime: Date;
  readTime: number;
  book: Book
}
