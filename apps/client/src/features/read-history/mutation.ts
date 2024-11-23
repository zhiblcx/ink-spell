import { httpRequest } from "@ink-spell/axios";
import { handleAxiosError } from "../utils";

export const updateReadHistory = (readHistoryId: number) => useMutation({
  mutationFn: () => httpRequest.put("read-history", { readHistoryId }),
  onError: handleAxiosError
})
