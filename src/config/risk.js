const colors = {
  'low': 'yellow', 
  'medium': 'warning',
  'high': 'error'
}

const getColorFromRisk = function(risk) {
  return colors[risk.toLowerCase()]
}


export {
  colors,
  getColorFromRisk
}
