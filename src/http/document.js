import { apis } from "@/config"
import { GetApi, PostApi, pathParse } from "@/utils/api"

export const postDocument = function(body) {
  return PostApi(apis.post_document, body)
}

export const getDocuments = function(query) {
  const newUrl = pathParse(apis.get_documents, query)
  return GetApi(newUrl)
}

export const getDocumentByUUID = function(query) {
  const newUrl = pathParse(apis.current_user, query)
  return GetApi(newUrl)
}
