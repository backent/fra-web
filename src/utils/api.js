import { ofetch } from 'ofetch'

const baseApiConfig = {
  baseURL: '/api',
  async onRequest({ options }) {
    const accessToken = useCookie('accessToken').value
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
  },
}

export const $api = ofetch.create({
  ...baseApiConfig
})


export const PostApi = function(url, body) {
  return ofetch(url, {
    ...baseApiConfig,
    method: 'POST',
    body
  })
}

export const GetApi = function(url) {
  return ofetch(url, {
    ...baseApiConfig,
    method: 'GET'
  })
}

export const PutApi = function(url) {
  return ofetch(url, {
    ...baseApiConfig,
    method: 'PUT',
    body
  })
}

export const DeleteApi = function(url) {
  return ofetch(url, {
    ...baseApiConfig,
    method: 'DELETE'
  })
}
