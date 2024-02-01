const status = {
  'reject': {
    'author': {
      text: 'Need Follow Up',
      color: 'orange',
    },
    'reviewer': {
      text: 'Return',
      color: 'error',
    }
  },
  'approve': {
    'author': {
      text: 'Approved',
      color: 'success',
    },
    'reviewer': {
      text: 'Approved',
      color: 'success',
    }
  },
  'draft': {
    'author': {
      text: 'Draft',
      color: 'grey-500',
    },
    'reviewer': {
      text: 'Draft',
      color: 'grey-500',
    }
  },
  'submit': {
    'author': {
      text: 'Submit',
      color: 'info',
    },
    'reviewer': {
      text: 'Submit',
      color: 'info'
    }
  },
  'update': {
    'author': {
      text: 'Updated',
      color: 'info',
    },
    'reviewer': {
      text: 'Updated',
      color: 'info'
    }
  }
}

const getStatus = function (action, role) {
  if (!action || !role) {
    return ''
  }
  return status[action][role].text
}

const getColorStatus = function (action, role) {
  if (!action || !role) {
    return ''
  }
  return status[action][role].color
}



export {
  getColorStatus, getStatus
}

