import { httpRequest } from "@/shared/API";
import { QueryKeysEnum } from "@/shared/enums/QueryKeysEnum";
import { useQuery } from "@tanstack/vue-query";

export const selectAllBookQuery = () =>
  useQuery({
    queryKey: [QueryKeysEnum.ALL_BOOK_KEY],
    queryFn: () => httpRequest.get("/book/all/info")
  })
