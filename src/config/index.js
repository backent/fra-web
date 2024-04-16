export const apis = {
  auth_login: '/login',
  current_user: '/current-user',
  post_document: '/documents',
  post_upload_final_document: '/documents-upload-final',
  get_documents: '/documents',
  get_document_by_uuid: '/documents/:id',
  get_document_by_id: '/documents/:id',
  get_document_distinct_product_name: '/documents-product-name',
  approve_document: '/documents-approve',
  reject_document: '/documents-reject',
  monitoring_document: '/documents-monitoring',
  tracking_document: '/documents-tracker/:name',
  get_document_dashboard_summary: '/documents-dashboard-summary',
  post_document_tracker: '/documents-tracker-count',
  get_dashboard: '/dashboards',
  get_notifications: '/notifications',
  get_document_search_global: 'documents-search-global',
  read_all_notifications: '/notifications/read-all',
  user_registration_apply: '/user-registrations/apply',
  user_registration_approve: '/user-registrations/approve',
  user_registration_reject: '/user-registrations/reject',
  get_user_registration: '/user-registrations',
  get_user: '/users',
  delete_user: '/users/:id',
  update_user: '/users/:id',
  ldap_check: '/user-registrations-check-ldap',
}

export const roles = ['superadmin', 'author', 'reviewer' , 'guest']
