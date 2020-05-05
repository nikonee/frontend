import axios from 'axios'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: process.env.VUE_APP_API,
  withCredentials: false,
  timeout: 10000,
})

request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    const data = response.data
    switch (data.StatusCode) {
      default:
        return Promise.resolve(data)
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
