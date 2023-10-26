import { IBreadcrumb } from '../types'

export function getBreadByMenus(menus: any[], path: string) {
  const breadcrumbs: IBreadcrumb[] = []

  const _recur = (arr: any[]) => {
    let filterMenu: any = null
    arr.forEach((item) => {
      if (!filterMenu) {
        if (item.path === path) {
          breadcrumbs.push({ label: item.title })
          filterMenu = item
        } else if (item.children && item.children.length) {
          const child = _recur(item.children)
          if (child) {
            breadcrumbs.unshift({ label: item.title })
            filterMenu = child
          }
        }
      }
    })

    return filterMenu
  }

  _recur(menus)

  return breadcrumbs
}
