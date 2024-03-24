import { deleteUser, getUserRegistrations, getUsers, postUserRegistrationApply, postUserRegistrationApprove, postUserRegistrationReject, putUser } from "@/http/user";
import { CapitalizeFirstLetter } from "@/utils/formatter";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
  state() {
    return {

    }
  },
  getters: {

  },
  actions: {
    async fetchUsers(query) {
      return getUsers(query)
    },
    async removeUser(id) {
      return deleteUser({ id })
    },
    async updateUser(body) {
      return putUser(body)
    },
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
          email: item.email,
        }
      })
    },
    userToTable(data) {
      return data.map(item => {
        return {
          id: item.id,
          name: item.name,
          nik: item.nik,
          status: item.status,
          email: item.email,
          unit: CapitalizeFirstLetter(item.unit),
          role: CapitalizeFirstLetter(item.role),
        }
      })
    }
  }
})
