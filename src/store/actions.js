import { setToken, setUserInfo } from '../assets/js/auth'

const actions = {
  createLoginInfo ({commit}, params) {
    setToken(params.id)
    setUserInfo(params.data)
    commit({
      type: 'LOGININFO',
      info: params
    })
  },
  // 页面切换loading
  updateLoadingStatus ({commit}, params) {
    commit({
      type: 'loadingStatus',
      info: params
    })
  },
  updateLayoutIndex ({commit}, params) {
    commit({
      type: 'layoutIndex',
      info: params
    })
  }
}

export default actions
