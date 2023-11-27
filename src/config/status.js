const colors = {
  'approved': 'success',
  'on progress': 'secondary',
  'reject': 'error',
  'new': 'info',
}

const getColorFromStatus = function(status) {
  return colors[status.toLowerCase()]
}


export {
  colors,
  getColorFromStatus
}
