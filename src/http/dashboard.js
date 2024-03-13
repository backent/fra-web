import { apis } from "@/config"
import { GetApi } from "@/utils/api"


export const getDocumentDashboardSummary = function () {
  return GetApi(apis.get_dashboard)
}
