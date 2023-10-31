import { IUserItem } from '@/service/system/types'
import type { IMenu } from '@/service/login/types'

export interface SystemState {
  userList: IUserItem[]
  menuList: IMenu[]
}
