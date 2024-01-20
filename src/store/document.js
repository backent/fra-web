import { getDocumentById, getDocuments, postDocument } from "@/http/document";
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
    async fetchDocumentById(query) {
      return getDocumentById(query)
        .then(res => res.data)
    },
    async submitDocument(body) {
      return postDocument(body)
    },
    documentResponseToTable(response) {
      return response.map(item => {
        return {
          id: item.id,
          product_name: item.product_name,
          created_at: item.created_at,
          updated_at: item.updated_at,
          status: item.action,
          action: 'action'
        }
      })
    }
  }
})
