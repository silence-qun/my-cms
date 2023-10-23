import type { IMenu } from '@/service/login/types'

export interface LoginState {
  token: string
  userInfo: any
  menu: IMenu[] | null
}
