import { getDocumentDashboardSummary } from "@/http/dashboard";
import { defineStore } from "pinia";

export const useDashboardStore = defineStore('dashboard', {
  actions: {
    async fetchDocumentDashboardSummary(query) {
      return getDocumentDashboardSummary(query)
        .then(res => res.data)
    },
  }
})
