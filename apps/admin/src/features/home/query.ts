import { QueryKeysEnum } from "@/shared/enums/QueryKeysEnum";
import { httpRequest } from "@ink-spell/axios";
import { useQuery } from "@tanstack/vue-query";

export const selectDashBoardStateQuery = () =>
  useQuery({
    queryKey: [QueryKeysEnum.DASHBOARD_STATE],
    queryFn: () => httpRequest.get("/admin/dashboard-state"),
  })
