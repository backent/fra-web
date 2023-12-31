import { postAuth } from "@/http/auth";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      currentUser: {}
    }
  },
  getters: {},
  actions: {
    async login(body) {
      return postAuth(body)
        .then(res => {
          console.log({ res })
          return res
        })
    }
  }
})
