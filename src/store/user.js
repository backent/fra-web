import { getUserRegistrations, postUserRegistrationApply, postUserRegistrationApprove, postUserRegistrationReject } from "@/http/user";
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
    async postUserRegistrationApprove(body) {
      return postUserRegistrationApprove(body)
    },
    async postUserRegistrationReject(body) {
      return postUserRegistrationReject(body)
    },
    async fetchUserRegistrations(query) {
      return getUserRegistrations(query)
    },
    userRegistrationToTable(res) {
      return res.map(item => {
        return {
          id: item.id,
          name: item.name,
          nik: item.nik,
          status: item.status,
          email: item.email,
        }
      })
    }
  }
})
