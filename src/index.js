// CascadeTree 插件对应组件的名字
import CascadeTree from './components/CascadeTree'

// Vue.js 的插件应当有一个公开方法 install 。第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
// 参考：https://cn.vuejs.org/v2/guide/plugins.html#开发插件
// 此处注意，组件需要添加name属性，代表注册的组件名称，也可以修改成其他的
CascadeTree.install = Vue => Vue.component(CascadeTree.name, CascadeTree) //注册组件
// 支持使用标签的方式引入 Vue是全局变量时，自动install
if (typeof window !== 'undefined' && window.Vue) {
  // 标签的方式引入
  const install = (Vue, opts = {}) => {
　　Vue.component(CascadeTree.name, CascadeTree)
　}
  install(window.Vue)
}

export default CascadeTree