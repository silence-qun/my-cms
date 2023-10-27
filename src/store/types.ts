import { LoginState } from './login/types'
import { AppState } from './app/types'
import { SystemState } from './system/types'

export interface RootState {
  isRoot: boolean
}

export interface RootWithModule {
  login: LoginState
  app: AppState
  system: SystemState
}

export type StoreType = RootState & RootWithModule
