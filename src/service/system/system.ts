import service from '..'
// import { IUserItem } from './types'

enum systemApi {
  User = '/users',
  Dept = '/dept'
}

type IUrl = keyof typeof systemApi

export function getPageListRe(url: IUrl) {
  return service.request({
    url: systemApi[url]
  })
}
