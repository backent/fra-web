import dayjs from 'dayjs'

const formatCompleteTime = function(timestamp) {
  return dayjs(timestamp).format('dddd, DD/MM/YYYY HH:mm')
}

const formatTableDate = function(timestamp) {
  return dayjs(timestamp).format('D MMMM YYYY')
}

export {
  formatCompleteTime,
  formatTableDate
}
