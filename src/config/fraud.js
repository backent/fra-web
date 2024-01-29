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
  'Frekuensi (2)': [
    'Risiko pernah terjadi sekali dalam 5 tahun terakhir, atau Risiko mungkin terjadi dalam waktu 5 tahun yang akan datang',
    'Risiko pernah terjadi sekali dalam 4 tahun terakhir, atau Risiko mungkin terjadi dalam waktu 4 tahun yang akan datang',
    'Risiko pernah terjadi sekali dalam 3 tahun terakhir, atau Risiko mungkin terjadi dalam waktu 3 tahun yang akan datang',
    'Risiko pernah terjadi sekali dalam 2 tahun terakhir, atau Risiko mungkin terjadi dalam waktu 2 tahun yang akan datang',
    'Risiko pernah terjadi sekali dalam 1 tahun terakhir, atau Risiko mungkin terjadi dalam waktu 1 tahun yang akan datang',
  ]
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
  'Ketidaktercapaian Gross Transaction Value (GTV) atau Gross Merchandise Value (GMV) [Khusus untuk Digital Business]': [
    'Tidak Tercapainya GTV/GMV sebesar <5% dari target',
    'Tidak tercapainya GTV/GMV sebesar 5% 5 x < 10% dari target',
    'Tidak Tercapainya GTV/GMV sebesar 10% ≤ x < 15% dari target',
    'Tidak Tercapainya GTV/GMV sebesar 15% ≤ x < 20% dari target',
    'Tidak Tercapainya GTV/GMV sebesar ≥ 20% dari target',
  ],
  'Ketidakpuasan Pemangku Kepentingan (i.e., customer, investor, vendor, dan internal perusahaan)': [
    'Tidak terdapat penyampaian ketidakpuasan dari pemangku kepentingan (pemangku kepentingan merasa puas)',
    'Ketidakpuasan pemangku kepentingan eksternal yang disampaikan melalui verbal/informal Ketidakpuasan pemangku kepentingan yang memicu diadakannya Atau ketidakpuasan pemangku kepentingan internal yang disampaikan secara tertulis/formal (contoh: WBS)',
    'Ketidakpuasan pemangku kepentingan yang memicu diadakannya pertemuan/meeting pembahasan formal yang hasilnya dituangkan secara tertulis',
    'Menerima penyampaian ketidakpuasan/ peringatan secara tertulis (formal) dari pemangku kepentingan baik ditujukan langsung pada perusahaan ataupun disampaikan pada pihak esternal terkait (i.e., LSM, regulator, Lembaga terkait) Atau ketidakpuasan pemangku kepentingan internal secara masif/massal)',
    'Menerima peringatan secara tertulis (formal) dengan disertai adanya sanksi/tuntutan, atau Adanya aksi protes/demo/unrest dari pihak internal maupun eksternal perusahaan',
  ],
  'Ketidaktercapaian Monthly Active User (MAU) [Khusus untuk Digital Business]': [
    'MAU tidak tercapai <5%',
    'MAU tidak tercapai 5-10%',
    'MAU tidak tercapai 10-15%',
    'MAU tidak tercapai 15-20%',
    'MAU tidak tercapai > 20%',
  ],
  'Reputasi (Pelanggan dan Pemberitaan Media)': [
    'Terdapat masukan dari pelanggan baik verbal maupun tertulis',
    'Munculnya keluhan/publisitas bersentimen negatif yang disampaikan secara verbal; atau yang disampaikan pada channel customer service resmi',
    'a. Munculnya keluhan/publisitas bersentimen negatif di media sosial b. Terdapat pemberitaan negatif yang dimuat di media lokal (lokasi kejadian maupun tingkat kotamadya/kabupaten)',
    'Munculnya keluhan/publisitas bersentimen negatif di media cetak regional maupun nasional; atau di media online; di media sosial yang berulang dan menjadi viral (i.e., menjadi trending topic)',
    'Muncuinya keluhan/publisitas bersentimen negatif yang menjadi viral secara berulang dan berkepanjangan; dimuat di media internasional atau menjadi headline di berbagai media cetak maupun online secara berulang & berkepanjangan atau menimbulkan reaksi dari public figure/influencer ternama/Key Opinion Leader, shareholder, ataupun menyebabkan penurunan harga saham yang signifikan hingga terjadi Auto Reject Bawah (ARB)',
  ],
  'Gangguan Layanan atau Kesisteman IT yang mempengaruhi Layanan': [
    null,
    'Sistem terganggu, aset informasi terganggu dan minor',
    'Sistem terganggu, aset informasi mash dapat digunakan, dan perlu waktu untuk me-restore Dampak downtime dirasakan secara lokal pada kota/kabupaten tertentu',
    'Sistem terganggu, aset informasi dapat digunakan, restore perlu link alternatif Dampak downtime dirasakan secara regional lebih dari 1 kota/kabupaten',
    'Sistem shut down, aset informasi tidak tersedia sama sekali, tidak bisa restore Dampak downtime dirasakan secara nasional',
  ],
  'Gangguan Layanan atau Kesisteman IT yang mempengaruhi Layanan (2)': [
    null,
    null,
    null,
    'Gangguan pada aplikasi/sistem core',
    'Gangguan pada aplikasi/sistem core >1 jam',
  ],
  'Gangguan Layanan atau Kesisteman IT yang mempengaruhi Layanan (3)': [
    'Gangguan pada aplikasi/layanan non-core selama < 2 jam',
    'Gangguan pada aplikasi/layanan non-core selama 2 hingga 4 jam',
    'Gangguan pada aplikasi/layanan non-core selama 4 hingga 6 jam',
    'Gangguan pada aplikasi/layanan non-core selama 6 hingga 10 jam',
    'Gangguan pada aplikasi/layanan noncore selama >10 jam',
  ],
  'Gangguan Layanan atau Kesisteman IT yang mempengaruhi Layanan (4)': [
    'Gangguan pada layanan retail selama < 2 jam',
    'Gangguan pada layanan retail selama 2 hingga 3 jam',
    'Gangguan pada layanan retail selama 3 hingga 5 jam',
    'Gangguan pada layanan retail selama 5 hingga 10 jam',
    'Gangguan pada layanan retail selama >10 jam',
  ],
  'Gangguan Layanan atau Kesisteman IT yang mempengaruhi Layanan (5)': [
    'Gangguan pada layanan corporate/enterprise selama < 30 menit',
    'Gangguan pada layanan corporate/enterprise selama 30 hingga 60 menit',
    'Gangguan pada layanan corporate/enterprise selama 60 hingga 75 menit',
    'Gangguan pada layanan corporate/enterprise selama 75 hingga 120 menit',
    'Gangguan pada layanan corporate/enterprise selama >120 menit',
  ],
  'Gangguan Layanan atau Kesisteman IT yang mempengaruhi Layanan (6)': [
    'Gangguan pada layanan digital selama < 2 jam',
    'Gangguan pada layanan digital selama 2 hingga 5 jam',
    'Gangguan pada layanan digital selama 5 hingga 8 jam',
    'Gangguan pada layanan digital selama 8 hingga 24 jam',
    'Gangguan pada layanan digital selama >24 jam',
  ],
  'Gangguan Operasional kesisteman IT non layanan atau tidak mempengaruhi lavanan (termasuk alat produksi)': [
    'Terdapat gangguan sistem IT, operasional terhambat < 1 jam',
    'Terdapat gangguan sistem IT, operasional terhambat 1-2 jam',
    'Terdapat gangguan sistem IT, operasional terhambat 2-3 jam',
    'Terdapat gangguan sistem IT, operasional terhambat 3-5 jam',
    'Terdapat gangguan sistem IT, operasional terhambat > 5 jam',
  ],
  'Tertundanya pencapaian SLA': [
    'Tertundanya pencapaian SLA sebesar <5%',
    'Tertundanya pencapaian SLA sebesar 5-10%',
    'Tertundanya pencapaian SLA sebesar 10-15%',
    'Tertundanya pencapaian SLA sebesar 15-20%',
    'Tertundanya pencapaian SLA sebesar >20%',
  ],
  'Keterlambatan Penyelesaian Proyek/Inisiatif/ Program': [
    'Keterlambatan penyelesaian program sebesar 20% ',
    'Keterlambatan penyelesaian proyek/inisiatif/ program sebesar 20%-30% dari target rencana',
    'Keterlambatan penyelesaian proyek/inisiatif/ program sebesar 30%-40% dari target rencana',
    'Keterlambatan penyelesaian proyek/inisiatif/ program sebesar 40%-50% dari target rencana',
    'Keterlambatan penyelesaian proyek/inisiatif/ program sebesar >50% dari target rencana',
  ],
  'Korban dari kejadian kerja/dinas': [
    'Tanpa cedera',
    'Kecelakaan mengakibatkan cedera ringan luka lecet dan dapat diatasi menggunakan P3K',
    'Kecelakaan mengakibatkan cedera sedang yang membutuhkan medical treatment injury/ perawatan medis yang bisa mengakibatkan hilangnya hari kerja',
    'Kecelakaan mengakibatkan cacat permanen (>30% dari tubuh) pada satu orang atau lebih yang membatasi aktivitas harian karena cedera atau sakit',
    'Kecelakaan mengakibatkan cacat permanen yang menyebabkan personel tidak dapat melakukan pekerjaannya atau mengakibatkan korban jiwa (kehilangan tenaga kerja)',
  ],
  'Adanya temuan dan/atau Misstatement Laporan Keuangan': [
    null,
    'Ada catatan tetapi bukan deficiency',
    'Adanya temuan dan/atau Misstatement yang mengindikasikan Control Deficiency',
    'Adanya temuan dan/atau Misstatement yang mengindikasikan Significant Deficiency',
    'Adanya temuan dan/atau Misstatement yang mengindikasikan Material Weakness',
  ],
  'Perselisihan (termasuk dengan pekerja)': [
    'Tidak ada perselisihan',
    'Timbulnya perselisihan yang dapat diselesaikan di luar pengadilan baik dengan cara verbal (lisan) maupun tertulis dan tidak adanya pemberian kompensasi',
    'Timbuinya perselisihan yang dapat diselesaikan di luar pengadilan dengan adanya pemberian kompensasi',
    'Timbulnya perselisihan yang perlu diselesaikan melalui kesepakatan kedua belah pihak yang diperintahkan oleh pengadilan',
    'Timbulnya perselisihan yang perlu diselesaikan oleh putusan hakim di pengadilan',
  ],
  'Sanksi dari Regulator dan/atau Aparat Penegak Hukum': [
    'Tidak terdapat teguran (baik lisan maupun tertulis) dari regulator dan/atau aparat penegak hukum',
    'Teguran lisan/informal dari regulator dan/atau aparat penegak hukum',
    'Terdapat teguran secara tertulis dari regulator dan/atau aparat penegak hukum (teguran formal, surat peringatan formal)',
    'Terdapat sanksi berupa denda dari regulator dan/atau aparat penegak hukum',
    'Pelanggaran yang mengakibatkan sanksi pidana (seperti namun tidak terbatas pada denda pidana/ganti rugi kerugian negara) dan/atau ganti rugi perdata dan/atau pemutusan kontrak atau penghentian sementara dan/atau pencabutan izin layanan/usaha kegiatan usaha dari regulator dan/atau aparat penegak hukum',
  ]
  
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

