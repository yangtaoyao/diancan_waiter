import axios from 'axios'
import store from '../store'
import qs from 'qs'
import {baseURL} from '../assets/js/common'

const instance = axios.create({
  baseURL: 'http://' + baseURL,
  timeout: 4000,
    // withCredentials: true, // 跨域请求时是否需要使用凭证
  paramsSerializer: params => {
        // 序列化 GET 请求参数 -> a: [1, 2] => a=1&a=2
    return qs.stringify(params, { arrayFormat: 'repeat' })
  },
  transformRequest: [data => {
        // 在向服务器发送前修改请求数据，只适用于 POST
    return qs.stringify(data, { arrayFormat: 'repeat' })
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// http 请求拦截器
instance.interceptors.request.use(config => {
  store.dispatch('updateLoadingStatus', {isLoading: true})
  return config
}, error => {
  store.dispatch('updateLoadingStatus', {isLoading: false})
  this.$vux.toast.show({
    text: '数据加载超时！',
    position: 'middle',
    type: 'cancel'
  })
  return Promise.reject(error)
})

// http 响应拦截器
instance.interceptors.response.use(response => {
  store.dispatch('updateLoadingStatus', {isLoading: false})
  return response
}, error => {
  store.dispatch('updateLoadingStatus', {isLoading: false})
  this.$vux.toast.show({
    text: '数据加载失败！',
    position: 'middle',
    type: 'cancel'
  })
  return Promise.reject(error)
})

/**
 * 向后台请求数据的 API 接口
 */

// 登录接口
export const doLogin = params => instance.post('/doLogin', params)
