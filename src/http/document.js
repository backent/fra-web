import { apis } from "@/config"
import { GetApi, PostApi, pathParse } from "@/utils/api"

export const postDocument = function(body) {
  return PostApi(apis.post_document, body)
}

export const getDocuments = function(query) {
  const newUrl = pathParse(apis.get_documents, query)
  return GetApi(newUrl)
}

export const getDocumentById = function(query) {
  const newUrl = pathParse(apis.get_document_by_id, query)
  return GetApi(newUrl)
}

export const getDocumentsDistinctProductName = function(query) {
  const newUrl = pathParse(apis.get_document_distinct_product_name, query)
  return GetApi(newUrl)
}

export const approveDocument = function(body) {
  return PostApi(apis.approve_document, body)
}

export const rejectDocument = function(body) {
  return PostApi(apis.reject_document, body)
}

export const getMonitoringDocuments = function(query) {
  const newUrl = pathParse(apis.monitoring_document, query)
  return GetApi(newUrl)
}