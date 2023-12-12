import { LoginState } from './login/types'
import { AppState } from './app/types'
import { SystemState } from './system/types'
import { AnalysisState } from './analysis/types'

export interface RootState {
  isRoot: boolean
}

export interface RootWithModule {
  login: LoginState
  app: AppState
  system: SystemState
  analysis: AnalysisState
}

export type StoreType = RootState & RootWithModule
