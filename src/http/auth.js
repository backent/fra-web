import { apis } from "@/config"
import { GetApi, PostApi } from "@/utils/api"

export const postAuth = function(body) {
  return PostApi(apis.auth_login, body)
}

export const getCurrentUser = function() {
  return GetApi(apis.current_user)
}
