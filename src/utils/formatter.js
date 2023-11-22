import dayjs from 'dayjs'

const formatCompleteTime = function(timestamp) {
  return dayjs(timestamp).format('dddd, DD/MM/YYYY HH:mm')
}

const formatTableDate = function(timestamp) {
  return dayjs(timestamp).format('D/MM/YYYY')
}

export {
  formatCompleteTime,
  formatTableDate
}
