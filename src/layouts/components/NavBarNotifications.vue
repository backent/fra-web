<script setup>
import DocumentDetailDialog from '@/components/DocumentDetailDialog.vue';
import { getColorStatus } from '@/config/document';
import { templateWithDetail } from '@/config/risk';
import { useAuthStore } from '@/store/auth';
import { useDocumentStore } from '@/store/document';
import { useNotificationStore } from '@/store/notification';


const notificationStore = useNotificationStore()
const authStore = useAuthStore()
const documentStore = useDocumentStore()

const selectedDocument = ref({ ...templateWithDetail })
const detailMode = ref('overall')
const detailDialog = ref(false)

const notifications = computed(() => {
  return notificationStore.formattedNotification.map(notification => {
    return {
      ...notification,
      color: getColorStatus(notification.action, authStore.currentUser.role)
    }
  })
})

const removeNotification = notificationId => {
  notifications.value.forEach((item, index) => {
    if (notificationId === item.id)
      notifications.value.splice(index, 1)
  })
}

const markRead = notificationId => {
  // notifications.value.forEach(item => {
  //   notificationId.forEach(id => {
  //     if (id === item.id)
  //       item.isSeen = true
  //   })
  // })
}

const markUnRead = notificationId => {
  // notifications.value.forEach(item => {
  //   notificationId.forEach(id => {
  //     if (id === item.id)
  //       item.isSeen = false
  //   })
  // })
}

const handleNotificationClick = notification => {
  fetchDocumentById(notification.document_id)
  detailDialog.value = true
}

const fetchDocumentById = function (id) {
  documentStore.fetchDocumentById({ id })
    .then(res => {
      selectedDocument.value = { ...res }
    })
}

const notifMenuClickHandler = function () {
  notificationStore.readAllNotification()
}
</script>

<template>
  <div>
    <Notifications :notifications="notifications" @remove="removeNotification" @read="markRead" @unread="markUnRead"
      @click:notification="handleNotificationClick" @click="notifMenuClickHandler" />
    <DocumentDetailDialog v-model="selectedDocument" v-model:active="detailDialog" v-model:mode="detailMode" />
  </div>
</template>
