import service from '..'
import type { IAccount, IData, IUserInfo, IMenu } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  Info = '/getUserInfo',
  Menu = '/menu'
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

export function menuRe() {
  return service.request<IMenu>({
    url: LoginAPI.Menu
  })
}
