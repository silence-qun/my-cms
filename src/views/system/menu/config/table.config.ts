export const contentTabelConfig = {
  propList: [
    { prop: 'title', label: '菜单名称', align: 'center', width: '200px' },
    { prop: 'path', label: '路径', align: 'center' },
    { label: '操作', align: 'center', slotName: 'handle' }
  ],
  childrenProps: {
    rowKey: 'id',
    treeProps: { children: 'children' }
  },
  showFooter: false
}
