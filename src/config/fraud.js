const likelihoodMeasurementAndLevels = {
  'Probabilitas': [
    '0% < x ≤ 20%',
    '20% < x ≤ 40%',
    '40% < x ≤ 60%',
    '60% < x ≤ 80%',
    '80% < x < 100%'
  ],
  'Persentase Kejadian': [
    'Persentase kemungkinan terjadinya 0 - 5 % dari volume total dalam 1 periode',
    'Persentase kemungkinan terjadinya 5-10% dari volume total dalam 1 periode',
    'Persentase kemungkinan terjadinya 10-20% dari volume total dalam 1 periode',
    'Persentase kemungkinan terjadinya 20-50% dari volume total dalam 1 periode',
    'Persentase kemungkinan terjadinya >50% dari volume total dalam 1 periode',
  ],
  'Frekuensi': [
    'Kejadian < 2 kali dalam 1 tahun',
    'Kejadian 2-4 kali dalam 1 tahun',
    'Kejadian 5 - 7 kali dalam 1 tahun',
    'Kejadian 8 - 10 kali dalam 1 tahun',
    'Kejadian > 10 kali dalam 1 tahun',
  ],
}

const likelihoodResult = [
  {
    level: 'Very Low',
    color: 'success',
    description: '(Jarang / Rare / 1)'
  },
  {
    level: 'Low',
    color: 'success',
    description: '(Kemungkinan Kecil / Unlikely / 2)'
  },
  {
    level: 'Medium',
    color: 'warning',
    description: '(Mungkin Terjadi / Possible / 3)'
  },
  {
    level: 'High',
    color: 'error',
    description: '(Kemungkinan Besar / Likely / 4)'
  },
  {
    level: 'Very High',
    color: 'error',
    description: '(Hampir Pasti / Almost Certain / 5)'
  }
]

const impactMeasurementAndLevels = {
  'Tidak Tercapainya Target Revenue': [
    'Tidak tercapainya revenue sebesar <0.2% dari target',
    'Tidak tercapainya revenue sebesar 0.2% ≤ x < 1% dari target',
    'Tidak tercapainya revenue sebesar 1% ≤x< 2% dari target',
    'Tidak tercapainya revenue sebesar 2% ≤ x < 5% dari target',
    'Tidak tercapainya revenue sebesar ≥ 5% dari target'
  ],
  'Kerugian / Cost Saving Opportunity Loss Terhadap Net Income': [
    'Kerugian sebesar < 0.1% dari target Net Income',
    'Kerugian sebesar 0.1% ≤x< 0.2% dari target Net income',
    'Kerugian sebesar 0.2% ≤ x < 1% dari target Net Income',
    'Kerugian sebesar 1% ≤ x < 2% dari target Net Income',
    'Kerugian sebesar ≥ 2% dari target Net Income',
  ],
  // 'Ketidaktercapaian Gross Transaction': [
  //   'Kejadian < 2 kali dalam 1 tahun',
  //   'Kejadian 2-4 kali dalam 1 tahun',
  //   'Kejadian 5 - 7 kali dalam 1 tahun',
  //   'Kejadian 8 - 10 kali dalam 1 tahun',
  //   'Kejadian > 10 kali dalam 1 tahun',
  // ],
}

const impactResult = [
  {
    level: 'Very Low',
    color: 'success',
    description: '(Tidak Berarti / Insignificant / 1)'
  },
  {
    level: 'Low',
    color: 'success',
    description: '(Ringan / Minor / 2)'
  },
  {
    level: 'Medium',
    color: 'warning',
    description: '(Sedang / Moderate / 3)'
  },
  {
    level: 'High',
    color: 'error',
    description: '(Besar / Major / 4)'
  },
  {
    level: 'Very High',
    color: 'error',
    description: '(Kritical / Critical / 5)'
  }
]

const riskLevel = [
  'Very Low',
  'Low',
  'Medium',
  'High',
  'Very High'
]

const calculateRiskLevel = function(likelihoodLevel, impactLevel) {
  const likelihoodIndex = riskLevel.findIndex(level => level.toLowerCase() === likelihoodLevel.toLowerCase())
  const impactIndex = riskLevel.findIndex(level => level.toLowerCase() === impactLevel.toLowerCase())
  if (likelihoodIndex < 0 || impactIndex < 0) {
    return ''
  } else {
    return riskLevel[Math.ceil(( likelihoodIndex + impactIndex ) / 2)]
  }
}


export {
  calculateRiskLevel, impactMeasurementAndLevels,
  impactResult,
  likelihoodMeasurementAndLevels,
  likelihoodResult,
  riskLevel
}

