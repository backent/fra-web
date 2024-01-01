import { getCurrentUser, postAuth } from "@/http/auth";
import { useStorage } from '@vueuse/core';
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      currentUser: {
        id: null
      },
      currentToken: useStorage('token', null)
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
    async login(body) {
      return postAuth(body)
        .then(res => {
          this.storeToken(res.data.token)
          // need to change code to actual currentUser data from be
          this.currentUser.id = 1
          console.log('after set', this.currentUser)
          return res
        })
    },
    async logout() {
      this.currentToken = null
    },
    async fetchCurrentUser() {
      return getCurrentUser()
        .then(res => {
          // need to change code to actual currentUser data from be
          this.currentUser.id = 1
          return res
        })
    },
    async initializeCurrentUser() {
      if (this.currentUserExists) {
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
