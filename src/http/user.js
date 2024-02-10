import { apis } from "@/config"
import { PostApi } from "@/utils/api"

export const postUserRegistrationApply = function(body) {
  return PostApi(apis.user_registration_apply, body)
}

