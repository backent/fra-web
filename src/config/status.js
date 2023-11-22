const colors = {
  'approved': 'success',
  'on progress': 'secondary'
}

const getColorFromStatus = function(status) {
  return colors[status.toLowerCase()]
}


export {
  colors,
  getColorFromStatus
}
