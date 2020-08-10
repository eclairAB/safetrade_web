import axios from 'axios'
import querystring from 'querystring'

import config from '../config'

export const Http = axios.create({
  baseURL: config.API_URL,
})

Http.interceptors.request.use(
  function (config) {
    const { token } = JSON.parse(localStorage.getItem('user') || '{}')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Deprecated, use asyncGetApi
export const getApi = function (url, filters) {
  if (filters) {
    url = `${url}?${querystring.stringify(filters)}`
  }
  return new Promise((resolve, reject) => {
    Http.get(url)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error.response)
      })
  })
}

// Deprecated, use asyncGetApi
export const postApi = function (url, payload) {
  return new Promise((resolve, reject) => {
    Http.post(url, payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error.response)
      })
  })
}

export const asyncGetApi = async (url, filters) => {
  if (filters) {
    url = `${url}?${querystring.stringify(filters)}`
  }
  return Http.get(url)
}

export const asyncPostApi = async (url, payload) => {
  return Http.post(url, payload)
}

export const patchApi = function (url, payload, config) {
  return new Promise((resolve, reject) => {
    Http.patch(url, payload, config)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error.response)
      })
  })
}
