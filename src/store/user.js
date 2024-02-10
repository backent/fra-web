import { getUserRegistrations, postUserRegistrationApply } from "@/http/user";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
  state() {
    return {

    }
  },
  getters: {

  },
  actions: {
    async postUserRegistrationApply(body) {
      return postUserRegistrationApply(body)
    },
    async fetchUserRegistrations(query) {
      return getUserRegistrations(query)
    },
    userRegistrationToTable(res) {
      return res.map(item => {
        return {
          name: item.nik,
          nik: item.nik,
          status: item.status,
          email: `${item.nik}@telkom.co.id`
        }
      })
    }
  }
})
