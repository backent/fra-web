import { apis } from "@/config"
import { GetApi, PostApi } from "@/utils/api"

export const postReadAllNotification = function(body) {
  return PostApi(apis.read_all_notifications, body)
}

export const getNotification = function() {
  return GetApi(apis.get_notifications)
}
