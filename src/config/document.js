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



export {
  getColorStatus, getStatus, getUploadMappingFieldActualFieldRisk
}

