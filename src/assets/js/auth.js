import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

// export const getToken = () => Cookies.get(TokenKey)
// export const setToken = token => Cookies.set(TokenKey, token)
// export const removeToken = () => Cookies.remove(TokenKey)

export const getToken = () => sessionStorage.getItem(TokenKey)
export const setToken = token => { sessionStorage.setItem(TokenKey, token) }
export const removeToken = () => sessionStorage.removeItem(TokenKey)

export const getUserInfo = () => {
  let UserInfo = Cookies.getJSON('UserWaiterInfo')
  return UserInfo
}
export const setUserInfo = UserInfo => {
  Cookies.set('UserWaiterInfo', UserInfo)
}
export const removeUserInfo = () => Cookies.remove('UserWaiterInfo')
