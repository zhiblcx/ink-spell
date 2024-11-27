import { httpRequest } from "@/shared/API";
import { QueryKeysEnum } from "@/shared/enums/QueryKeysEnum";
import { useQuery } from "@tanstack/vue-query";

export const selectAllBookshelfQuery = () =>
  useQuery({
    queryKey: [QueryKeysEnum.ALL_BOOKSHELF_KEY],
    queryFn: () => httpRequest.get("/bookshelf/all/info")
  })
