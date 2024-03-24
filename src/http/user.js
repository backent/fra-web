import { apis } from "@/config"
import { DeleteApi, GetApi, PostApi, PutApi } from "@/utils/api"

export const postUserRegistrationApply = function(body) {
  return PostApi(apis.user_registration_apply, body)
}
export const postUserRegistrationApprove = function(body) {
  return PostApi(apis.user_registration_approve, body)
}
export const postUserRegistrationReject = function(body) {
  return PostApi(apis.user_registration_reject, body)
}

export const getUserRegistrations = function(query) {
  const newUrl = pathParse(apis.get_user_registration, query)
  return GetApi(newUrl)
}

export const getUsers = function(query) {
  const newUrl = pathParse(apis.get_user, query)
  return GetApi(newUrl)
}

export const deleteUser = function (query) {
  const newUrl = pathParse(apis.delete_user, query)
  return DeleteApi(newUrl)
}

export const putUser = function (body) {
  const newUrl = pathParse(apis.update_user, body)
  return PutApi(newUrl, body)
}


