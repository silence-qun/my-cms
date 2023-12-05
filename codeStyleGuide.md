# [代码风格指南](https://v2.cn.vuejs.org/v2/style-guide/ '风格指南')

## 组件名为多个单词

组件名应该始终是多个单词的，根组件 App 以及 \<transition\>、\<component\> 之类的 Vue 内置组件除外。  
这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的。

```javascript
// bad
Vue.component('todo', {
  // ...
})

export default {
  name: 'Todo'
  // ...
}

// good
Vue.component('todo-item', {
  // ...
})

export default {
  name: 'TodoItem',
  // ...
}
```

## 单文件组件文件名称

单文件组件的文件名应该要么始终是单词大写开头（PascalCase），要么始终是横线链接（kebab-case）。

```
// bad
mycomponent.vue
myComponent.vue

// good
my-component.vue
MyComponent.vue
```

## 自闭合组件

在单文件组件、字符串模板和 JSX 中没有内容的组件应该是自闭合的——但在 DOM 模板里永远不要这样做。  
自闭合组件表示它们不仅没有内容，而且刻意没有内容。其不同之处就好像书上的一页白纸对比贴有“本页有意留白”标签的白纸。而且没有了额外的闭合标签，你的代码也更简洁。  
不幸的是，HTML 并不支持自闭合的自定义元素——只有官方的“空”元素。所以上述策略仅适用于进入 DOM 之前 Vue 的模板编译器能够触达的地方，然后再产出符合 DOM 规范的 HTML。

```vue
<!-- bad -->
<!-- 在单文件组件、字符串模板和 JSX 中 -->
<MyComponent></MyComponent>
<!-- 在 DOM 模板中 -->
<my-component />

<!-- good -->
<!-- 在单文件组件、字符串模板和 JSX 中 -->
<MyComponent />
<!-- 在 DOM 模板中 -->
<my-component></my-component>
```

## Prop 名大小写

在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板中应该始终使用 kebab-case。

```javascript
// bad
export default {
  props: {
    'greeting-text': String,
  },
};

// good
export default {
  props: {
    greetingText: String,
  },
};
```

```vue
<!-- bad -->
<welcome-message greetingText="hi" />

<!-- good -->
<welcome-message greeting-text="hi" />
```

## Props 顺序

标签的 Props 应该有统一的顺序，依次为指令、属性和事件。

```vue
<my-component v-if="if" v-show="show" v-model="value" ref="ref" :key="key" :text="text" @input="onInput" @change="onChange" />
```

## 组件选项的顺序

组件选项应该有统一的顺序。

```javascript
export default {
  name: '',

  components: {},

  props: {},

  emits: [],

  setup() {},

  data() {},

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  unmounted() {},

  methods: {}
}
```
