import { useStorage } from '@vueuse/core';
import { ofetch } from 'ofetch';

const baseApiConfig = {
  baseURL: import.meta.env.BASE_URL + 'api',
  async onRequest({ options }) {
    const token = useStorage('token').value
    options.headers = {
      ...options.headers,
      Authorization: token,
    }
  },
  async onResponseError({ response }) {
    if (response.status === 401) {
      window.location.href = import.meta.env.BASE_URL + 'login'
    }
  },
}

export const $api = ofetch.create({
  ...baseApiConfig
})


export const PostApi = function(url, body) {
  console.log('post api', { body })
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

export const PutApi = function(url, body) {
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

function objectToUrlParams(obj) {
  const flattenArray = (key, arr) => arr.map(value => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

  const paramsArray = Object.keys(obj).map(key => {
    if (Array.isArray(obj[key])) {
      return flattenArray(key, obj[key]);
    } else {
      return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
    }
  });

  return paramsArray.join('&');
}


export const pathParse = function(url, params) {
  if (!params) {
    return url
  }
  let newUrl = url
  let newParams = { ...params }
  Object.entries(params).forEach(([key, value]) => {
    if (newUrl.includes(':' + key)) {
      delete newParams[key]
    }
    newUrl = newUrl.replaceAll(':' + key, value)
  })

  if (Object.entries(params).length > 0 ) {
    newUrl +=  '?' + objectToUrlParams(newParams)
  }

  return newUrl

}
