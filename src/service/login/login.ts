import service from '..'
import type { IAccount, IData, IUserInfo } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  Info = '/getUserInfo'
}

export function loginRe(data: IAccount) {
  return service.request<IData>({
    url: LoginAPI.AccountLogin,
    data
  })
}

export function userInfoRe() {
  return service.request<IUserInfo>({
    url: LoginAPI.Info
  })
}
