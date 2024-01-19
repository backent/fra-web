const colors = {
  'low': 'yellow', 
  'medium': 'warning',
  'high': 'error'
}

const getColorFromRisk = function(risk) {
  return colors[risk.toLowerCase()]
}

const template = {
  id: '',
  document_id: '',
  user_id: '',
  risk_name: '',
  fraud_schema: '',
  fraud_motive: '',
  fraud_technique: '',
  risk_source: '',
  root_cause: '',
  bispro_control_procedure: '',
  qualitative_impact: '',
  likehood_justification: '',
  impact_justification: '',
  strategy_agreement: '',
  strategy_recomendation: '',
  assessment_likehood: '',
  assessment_impact: '',
  assessment_risk_level: '',
}


export {
  colors, getColorFromRisk, template
}

