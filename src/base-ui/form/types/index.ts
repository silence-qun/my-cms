type FormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string
  type: FormType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOps?: any
}

export interface IForm {
  formItem: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
