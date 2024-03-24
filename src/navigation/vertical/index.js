export default [
  {
    title: 'Dashboard',
    to: { name: 'dashboard' },
    icon: { icon: 'tabler-file-description' }
  },
  {
    title: 'Tracking Process FRA',
    to: { name: 'tracking-process-fra' },
    icon: { icon: 'tabler-checklist' }
  },
  {
    title: 'Account Request',
    to: { name: 'account-request' },
    icon: { icon: 'tabler-user-check' },
    meta: {
      allowedRoles: ['superadmin']
    }
  },
]
