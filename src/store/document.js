import { parameterMap } from "@/config/document";
import { approveDocument, getDocumentById, getDocumentDashboardSummary, getDocumentSearchGlobal, getDocuments, getDocumentsDistinctProductName, getMonitoringDocuments, getTrackingDocuments, postDocument, postDocumentTracker, postUploadFinalDocument, rejectDocument } from "@/http/document";
import { formatDateTime } from "@/utils/formatter";
import { defineStore } from "pinia";

export const useDocumentStore = defineStore('document', {
  state() {
    return {
    }
  },
  getters: {
    isTokenExist() {
      return !!this.currentToken && this.currentToken !== 'undefined' && this.currentToken !== 'null'
    },
    currentUserExists() {
      return !!this.currentUser.id
    }
  },
  actions: {
    async fetchDocuments(query) {
      return getDocuments(query)
    },
    async fetchDocumentsDistinctProductName(query) {
      return getDocumentsDistinctProductName(query)
    },
    async fetchDocumentById(query) {
      return getDocumentById(query)
        .then(res => {
          const formattedRelatedDocumentDetail = res.data.related_document_detail.map(item => {
            return {
              ...item,
              created_at: formatDateTime(item.created_at)
            }
          })

          return {
            ...res.data,
            created_at: formatDateTime(res.data.created_at),
            related_document_detail: formattedRelatedDocumentDetail
          }
        })
    },
    async fetchMonitoringDocuments(query) {
      return getMonitoringDocuments(query)
    },
    async fetchTrackingDocuments(query) {
      return getTrackingDocuments(query)
        .then(res => res.data)
    },
    async fetchDocumentDashboardSummary(query) {
      return getDocumentDashboardSummary(query)
        .then(res => res.data)
    },
    async fetchDocumentSearchGlobal(query) {
      return getDocumentSearchGlobal(query)
        .then(res => {
          return {
            ...res,
            data: this.searchResponseToSearchResult(res.data)
          }
        })
    },
    async submitDocument(body) {
      return postDocument(body)
    },
    async uploadFinalDocument(body) {
      return postUploadFinalDocument(body)
    },
    async approveDocument(id) {
      return approveDocument({ id })
    },
    async rejectDocument(payload) {
      return rejectDocument(payload)
    },
    async postDocumentTracker(uuid, type) {
      return postDocumentTracker({ uuid, type })
    },
    documentResponseToTable(response) {
      return response.map(item => {
        return {
          id: item.id,
          uuid: item.uuid,
          product_name: item.product_name,
          created_at: item.created_at,
          updated_at: item.updated_at,
          action: item.action
        }
      })
    },
    documentResponseToMonitoringTable(response) {
      return response.map(item => {
        return {
          id: item.id,
          product_name: item.product_name,
          created_at: item.created_at,
          action: item.action
        }
      })
    },
    trackingResponseToTrackingList(response) {
      return response.map(res => {
        const parent = {
          id: res.id,
          title: res.product_name,
          user_detail: res.user_detail
        }

        const tracker = [
          ...res.related_document_detail,
          {...res}
        ].map(item => {
          return {
            title: `FRA ${item.action}`,
            subtitle: item.user_detail.nik,
            timestamp: item.created_at,
            fileLink: item.file_link,
            filename: item.file_original_name,
            type: item.action
          }
        })

        return {
          ...parent,
          tracker
        }
      })
    },
    searchResponseToSearchResult(response) {
      return response.map(res => {
        const highlight = Object.entries(res.highlight).map(item => {
          const [field, value] = item
          return {
            field: parameterMap[field.replace('risk.', '')],
            value
          }
        })
        return {
          id: res.id,
          product_name: res.product_name,
          highlight
        }
      })
    }
  }
})
