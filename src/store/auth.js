import { getCurrentUser, postAuth } from "@/http/auth";
import { useStorage } from '@vueuse/core';
import { defineStore } from "pinia";
import { useNotificationStore } from "./notification";

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      currentUser: {
        id: null,
        nik: '',
        name: '',
        role: ''
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
    },
    isReviewer(){
      return this.currentUser.role.toLowerCase() === 'reviewer'
    },
    isAuthor() {
      return this.currentUser.role.toLowerCase() === 'author'
    },
    isGuest() {
      return this.currentUser.role.toLowerCase() === 'guest'
    }
  },
  actions: {
    async login(body) {
      return postAuth(body)
        .then(res => {
          this.storeToken(res.data.token)
          // need to change code to actual currentUser data from be
          return res
        })
    },
    async logout() {
      this.currentToken = null
      this.currentUser = {
        id: null,
        nik: '',
        name: '',
        role: ''
      }
    },
    async fetchCurrentUser() {
      return getCurrentUser()
        .then(res => {
          // need to change code to actual currentUser data from be
          this.currentUser = { ...res.data }
          return res
        })
    },
    async initializeCurrentUser() {
      try {
        const notificationStore = useNotificationStore()
        notificationStore.fetchAllNotification()
      } catch (e) {
        console.error("error while fetch notifications")
      }
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
