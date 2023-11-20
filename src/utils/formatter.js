import dayjs from 'dayjs'

const formatCompleteTime = function(timestamp) {
  return dayjs(timestamp).format('dddd, DD/MM/YYYY HH:mm')
}

export {
  formatCompleteTime
}
