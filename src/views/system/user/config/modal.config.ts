import type { IForm } from '@/base-ui/form/types'

export const modalConfig: IForm = {
  formItem: [
    { field: 'name', type: 'input', label: '用户名', placeholder: '请输入用户名' },
    { field: 'psd', type: 'password', label: '密码', placeholder: '请输入密码', isHidden: false },
    { field: 'phone', type: 'input', label: '电话号码', placeholder: '请输入电话号码' },
    { field: 'role', type: 'select', label: '角色', placeholder: '请选择角色', options: [] }
  ],
  colLayout: { span: 24 }
}
