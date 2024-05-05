const status = {
  'reject': {
    'author': {
      text: 'Need Follow Up',
      color: 'orange',
    },
    'superadmin': {
      text: 'Need Follow Up',
      color: 'orange',
    },
    'reviewer': {
      text: 'Return',
      color: 'error',
    },
    'guest': {
      text: 'Return',
      color: 'error',
    }
  },
  'approve': {
    'author': {
      text: 'Approved',
      color: 'success',
    },
    'superadmin': {
      text: 'Approved',
      color: 'success',
    },
    'reviewer': {
      text: 'Approved',
      color: 'success',
    },
    'guest': {
      text: 'Approved',
      color: 'success',
    }
  },
  'draft': {
    'author': {
      text: 'Draft',
      color: 'grey-500',
    },
    'superadmin': {
      text: 'Draft',
      color: 'grey-500',
    },
    'reviewer': {
      text: 'Draft',
      color: 'grey-500',
    },
    'guest': {
      text: 'Draft',
      color: 'grey-500',
    }
  },
  'submit': {
    'author': {
      text: 'Submit',
      color: 'info',
    },
    'superadmin': {
      text: 'Submit',
      color: 'info',
    },
    'reviewer': {
      text: 'Submit',
      color: 'info'
    },
    'guest': {
      text: 'Submit',
      color: 'info'
    }
  },
  'update': {
    'author': {
      text: 'Updated',
      color: 'info',
    },
    'superadmin': {
      text: 'Updated',
      color: 'info',
    },
    'reviewer': {
      text: 'Updated',
      color: 'info'
    },
    'guest': {
      text: 'Updated',
      color: 'info'
    }
  },
  'final': {
    'author': {
      text: 'Final',
      color: 'info',
    },
    'superadmin': {
      text: 'Final',
      color: 'info',
    },
    'reviewer': {
      text: 'Final',
      color: 'info'
    },
    'guest': {
      text: 'Final',
      color: 'info'
    }
  }
}

const getStatus = function (action, role) {
  if (!action || !role) {
    return ''
  } else if (!status[action]) {
    return ''
  } else if (!status[action][role]) {
    return ''
  } else {
    return status[action][role].text
  }
}

const getColorStatus = function (action, role) {
  if (!action || !role) {
    return ''
  } else if (!status[action]) {
    return ''
  } else if (!status[action][role]) {
    return ''
  } else {
    return status[action][role].color
  }
}

const uploadMappingField = {
  "Akar Penyebab": 'root_cause',
  "Control/ Prosedur (Bispro)": 'bispro_control_procedure',
  "Dampak Kualitatif": 'qualitative_impact',
  "Deskripsi Risiko": 'fraud_schema',
  "Fraud Schemes Assessment": 'assessment_likehood',
  "JustifIkasi": 'likehood_justification',
  "Nama Risiko": 'risk_name',
  "No": '',
  "Strategi Response": 'strategy_agreement',
  "Sumber Risiko": 'risk_source',
  "__EMPTY": 'fraud_motive',
  "__EMPTY_1": 'fraud_technique',
  "__EMPTY_2": 'assessment_impact',
  "__EMPTY_3": 'assessment_risk_level',
  "__EMPTY_4": 'impact_justification',
  "__EMPTY_5": 'strategy_recomendation',
}

const getUploadMappingFieldActualFieldRisk = function(importField) {
  return uploadMappingField[importField]
}

const exportColumnIndexMappingField = {
  'no': 0,
  'risk_name': 1,
  'fraud_schema': 2,
  'fraud_motive': 3,
  'fraud_technique': 4,
  'risk_source': 5,
  'root_cause': 6,
  'bispro_control_procedure': 7,
  'qualitative_impact': 8,
  'assessment_likehood': 9,
  'assessment_impact': 10,
  'assessment_risk_level': 11,
  'likehood_justification': 12,
  'impact_justification': 13,
  'strategy_agreement': 14,
  'strategy_recomendation': 15,
}

const exportStartRow = 4


const parameterMap = {
  'product_name': 'Product Name',
  'risk_name': 'Risk Name',
  'fraud_schema': 'Fraud Schema',
  'fraud_motive': 'Fraud Motive',
  'fraud_technique': 'Fraud Technique',
  'risk_source': 'Risk Source',
  'root_cause': 'Root Cause',
  'bispro_control_procedure': 'Bispro Control Procedure',
  'qualitative_impact': 'Qualitative Impact',
  'likehood_justification': 'Likehood Justification',
  'impact_justification': 'Impact Justification',
  'strategy_recomendation': 'Strategy Recommendation'
}




export { exportColumnIndexMappingField, exportStartRow, getColorStatus, getStatus, getUploadMappingFieldActualFieldRisk, parameterMap }

