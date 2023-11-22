import { defineStore } from "pinia";

export const useAppStore = defineStore('app', {
  state() {
    return {
      isSnackbarOpen: false,
      snackbarMessage: '',
      snackbarColor: 'secondary',
      snackbarTimeout: 1000
    }
  },
  actions: {
    openSnackbar({
      message,
      timeout = 1000,
      color
    }) {
      this.snackbarColor = color
      this.snackbarTimeout = timeout
      this.setMessage(message)
      this.isSnackbarOpen = true
    },
    closeSnackBar() {
      this.isSnackbarOpen = false
    },
    setMessage(message) {
      const vm = this
      vm.snackbarMessage = message
      setTimeout(() => {
        vm.snackbarMessage = ''
      }, this.snackbarTimeout)
    }
  }
})
