import { useStorage } from '@vueuse/core';
import { ofetch } from 'ofetch';

const baseApiConfig = {
  baseURL: '/api',
  async onRequest({ options }) {
    const token = useStorage('token').value
    options.headers = {
      ...options.headers,
      Authorization: token,
    }
  },
  async onResponseError({ response }) {
    if (response.status === 401) {
      window.location.href = '/login'
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
