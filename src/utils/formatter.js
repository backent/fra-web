import dayjs from 'dayjs'

const formatCompleteTime = function(timestamp) {
  return dayjs(timestamp).format('dddd, DD/MM/YYYY HH:mm')
}

const formatTableDate = function(timestamp) {
  return dayjs(timestamp).format('D MMMM YYYY')
}

const formatDateTime = function(timestamp) {
  return dayjs(timestamp).format('D MMMM YYYY HH:mm')
}

const getTimeAgo = function (timestamp) {
  const now = dayjs();
  const targetDate = dayjs(timestamp);

  const diffInSeconds = now.diff(targetDate, 'second');
  const diffInMinutes = now.diff(targetDate, 'minute');
  const diffInHours = now.diff(targetDate, 'hour');
  const diffInDays = now.diff(targetDate, 'day');
  const diffInMonths = now.diff(targetDate, 'month');

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else if (diffInDays === 1) {
    return 'yesterday';
  } else if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  } else if (diffInMonths === 1) {
    return '1 month ago';
  } else {
    return `${diffInMonths} months ago`;
  }
}

const CapitalizeFirstLetter = function(text) {
  if (!text) {
    return ''
  }
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export { CapitalizeFirstLetter, formatCompleteTime, formatDateTime, formatTableDate, getTimeAgo }

