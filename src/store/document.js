import { approveDocument, getDocumentById, getDocuments, getDocumentsDistinctProductName, getMonitoringDocuments, getTrackingDocuments, postDocument, rejectDocument } from "@/http/document";
import { formatTableDate } from "@/utils/formatter";
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
              created_at: formatTableDate(item.created_at)
            }
          })

          return {
            ...res.data,
            created_at: formatTableDate(res.data.created_at),
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
    async submitDocument(body) {
      return postDocument(body)
    },
    async approveDocument(id) {
      return approveDocument({ id })
    },
    async rejectDocument(payload) {
      return rejectDocument(payload)
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
          {...res},
          ...res.related_document_detail
        ].map(item => {
          return {
            title: `FRA ${item.action}`,
            subtitle: item.user_detail.nik,
            timestamp: item.created_at,
            type: 'info'
          }
        })

        return {
          ...parent,
          tracker
        }
      })
    }
  }
})
