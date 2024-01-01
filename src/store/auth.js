import { getCurrentUser, postAuth } from "@/http/auth";
import { useStorage } from '@vueuse/core';
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      currentUser: {},
      currentToken: useStorage('token', null)
    }
  },
  getters: {
    isTokenExist() {
      return !!this.currentToken && this.currentToken !== 'undefined' && this.currentToken !== 'null'
    }
  },
  actions: {
    async login(body) {
      return postAuth(body)
        .then(res => {
          this.storeToken(res.data.token)
          return res
        })
    },
    async logout() {
      this.currentToken = null
    },
    async fetchCurrentUser() {
      return getCurrentUser()
    },
    async initializeCurrentUser() {
      if (this.isTokenExist) {
        return Promise.resolve()
      } else {
        return this.fetchCurrentUser()
      }
    },
    storeToken(token) {
      this.currentToken = token
    }
  }
})
