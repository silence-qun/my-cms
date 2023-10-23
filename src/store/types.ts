import { LoginState } from './login/types'

export interface RootState {
  isRoot: boolean
}

export interface RootWithModule {
  login: LoginState
}

export type StoreType = RootState & RootWithModule
