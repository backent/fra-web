import { apis } from "@/config"
import { GetApi, PostApi } from "@/utils/api"

export const postUserRegistrationApply = function(body) {
  return PostApi(apis.user_registration_apply, body)
}

export const getUserRegistrations = function(query) {
  const newUrl = pathParse(apis.get_user_registration, query)
  return GetApi(newUrl)
}

