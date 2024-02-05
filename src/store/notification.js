import { getNotification, postReadAllNotification } from "@/http/notification";
import { formatTimeAgo } from "@vueuse/core";
import dayjs from "dayjs";
import { defineStore } from "pinia";

export const useNotificationStore = defineStore('notification', {
  state() {
    return {
      notifications: []
    }
  },
  getters: {
    formattedNotification() {
      return this.notifications.map(notification => {
        return {
          ...notification,
          isSeen: notification.read === 1,
          time: formatTimeAgo(dayjs(notification.created_at).toDate()),
        }
      })
    }
  },
  actions: {
    async fetchAllNotification() {
      return getNotification()
        .then(res => {
          this.notifications = res.data
        })
    },
    async readAllNotification() {
      return postReadAllNotification()
        .then(this.markAllAsRead)
    },
    markAllAsRead() {
      this.notifications = this.notifications.map(notification => {
        return {
          ...notification,
          read: 1
        }
      })
    }
    
  }
})
