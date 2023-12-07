<script setup>

const notifications = ref([
  {
    id: 1,
    color: 'warning',
    title: 'Your Assessment Has Feedback',
    subtitle: 'Your assessment "Toll Fraud SLI 2" get feedback from reviewers.',
    time: 'Today',
    isSeen: true,
  },
  {
    id: 2,
    color: 'success',
    title: 'Your Assessment Has Been Released',
    subtitle: 'Your assessment "Toll Fraud SLI" has been released.',
    time: 'Yesterday',
    isSeen: false,
  },
])

const removeNotification = notificationId => {
  notifications.value.forEach((item, index) => {
    if (notificationId === item.id)
      notifications.value.splice(index, 1)
  })
}

const markRead = notificationId => {
  notifications.value.forEach(item => {
    notificationId.forEach(id => {
      if (id === item.id)
        item.isSeen = true
    })
  })
}

const markUnRead = notificationId => {
  notifications.value.forEach(item => {
    notificationId.forEach(id => {
      if (id === item.id)
        item.isSeen = false
    })
  })
}

const handleNotificationClick = notification => {
  if (!notification.isSeen)
    markRead([notification.id])
}
</script>

<template>
  <Notifications :notifications="notifications" @remove="removeNotification" @read="markRead" @unread="markUnRead"
    @click:notification="handleNotificationClick" />
</template>
