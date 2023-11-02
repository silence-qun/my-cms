import service from '..'
// import { IUserItem } from './types'

enum systemApi {
  User = '/users',
  Dept = '/dept',
  Menu = '/menu',
  Delete = '/delete'
}

type IUrl = keyof typeof systemApi

export function getPageListRe(url: IUrl) {
  return service.request({
    url: systemApi[url]
  })
}
export function deletePageDataRe(url: IUrl, id: number) {
  return service.delete({
    url: `${systemApi[url]}${systemApi.Delete}/${id}`
  })
}
