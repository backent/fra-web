import { postUserRegistrationApply } from "@/http/user";
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
    }
  }
})
