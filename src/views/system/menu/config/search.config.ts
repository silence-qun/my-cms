import type { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItem: [
    { field: 'name', type: 'input', label: '菜单名称', placeholder: '请输入菜单名称' },
    { field: 'path', type: 'input', label: '路径', placeholder: '请输入路径' }
  ]
}
