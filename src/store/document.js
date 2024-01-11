import { getDocuments, postDocument } from "@/http/document";
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
        .then(res => res.data)
    },
    async submitDocument(body) {
      return postDocument(body)
    },
    documentResponseToTable(response) {
      return response.map(item => {
        return {
          risk_name: item.risk_name,
          source_risk: item.risk_source,
          risk_level: item.assessment_risk_level,
          created_at: item.created_at,
          updated_at: item.updated_at,
          status: item.action,
          action: 'action'
        }
      })
    }
  }
})
