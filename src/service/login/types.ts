export interface IAccount {
  account: string
  password: string
}

export interface IData {
  token: string
}

export interface IUserInfo {
  id: string
  name: string
}

export interface IMenu {
  id: string
  title: string
  name: string
  component: string
  path: string
  type: number
  icon?: string
  children?: IMenu[]
}
