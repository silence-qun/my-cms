import { LoginState } from './login/types'
import { AppState } from './app/types'

export interface RootState {
  isRoot: boolean
}

export interface RootWithModule {
  login: LoginState
  app: AppState
}

export type StoreType = RootState & RootWithModule
