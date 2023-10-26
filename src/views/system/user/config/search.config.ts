import type { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItem: [
    { field: 'name', type: 'input', label: '用户名' },
    { field: 'psd', type: 'password', label: '密码' },
    {
      field: 'role',
      type: 'select',
      label: '角色',
      options: [
        { value: 'boss', label: '董事长' },
        { value: 'staff', label: '员工' }
      ]
    },
    {
      field: 'time',
      type: 'datepicker',
      label: '创建时间',
      otherOps: {
        type: 'daterange',
        rangeSeparator: '至',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期'
      }
    }
  ]
}
