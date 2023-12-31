import { apis } from "@/config"
import { PostApi } from "@/utils/api"

export const postAuth = function(body) {
  return PostApi(apis.auth_login, body)
}
