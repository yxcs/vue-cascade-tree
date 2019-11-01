<template>
  <div ref="cascadeTree" class="cascade--tree__wrap" :style="{width: itemWidth* column + 'px'}">
    <div v-for="item in checkList" :key="item.key" class="cascade--tree__item"  :style="{width: itemWidth + 'px'}">
      <div :class="['cascade--tree__operate', item.key === activeKey ? 'active' : '']">
        <ct-checkbox
          v-model="item.isCheck"
          :label="item.key"
          :indeterminate="item.isIndeterminate"
          @change="superBoxChange($event, item)">
          <span class="name" :style="{'max-width': nameMaxWidth}">{{item.name}}</span>
        </ct-checkbox>
        <span v-if="item.subCheckLen" class="num">({{item.subCheckLen}})</span>
        <template v-if="item.subLen">
          <span class="arrow" @click="showSecondSelection(item.key)">
            <span :class="['ct-arrow-wrap', item.key === activeKey ? 'up' : 'down']"></span>
          </span>
          <div v-if="item.key === activeKey" class="cascade--tree__popup" :style="{width: itemWidth + 20 + 'px', 'max-height': popupMaxHeight}">
            <div class="popup-content">
              <div v-for="s in item.children" :key="s.key">
                <ct-checkbox
                  v-model="s.isCheck"
                  :label="s.key"
                  @change="subBoxChange($event, item)">
                  {{s.name}}
                </ct-checkbox>
              </div>
            </div>
            <div class="popup-close">
              <button class="ct-button ct-button--text" @click="showSecondSelection(activeKey)">关闭</button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import '../assets/main.css'
import CTCheckbox from './Checkbox'
export default {
  name: 'CascadeTree',
  components: {
    'ct-checkbox': CTCheckbox
  },
  props: {
    // v-model绑定的值，必传
    value: {
      type: Array,
      required: true
    },
    // 传进来的数据值，必传
    data: {
      type: Array,
      required: true
    },
    // 列数，最多包含几列
    column: {
      type: Number,
      default: 3,
      validator (v) {
        if (parseInt(v) !== v) {
          throw new Error('[column] 必须为正整数')
          return false
        }
        if (v < 1) {
          throw new Error('[column] 必须为正整数')
          return false
        }
        return true
      }
    },
    itemWidth: {
      type: Number,
      default: 160,
      validator (v) {
        if (v <= 0) {
          throw new Error('[column] 必须为正数')
          return false
        }
        return true
      }
    },
    // 整个组件的 宽度
    width: {
      type: Number,
      default: 500
    },
    // 组件的弹层的最大高度，超出滚动，宽度取 [this.width]值
    popupMaxHeight: {
      type: Number,
      default: 200
    },
    // 每一个主项和子项的唯一key的字段名称，用以兼容传进来的data
    primaryKey: {
      type: String,
      default: 'key'
    },
    // 每一个主项存放子项的字段名称，用以兼容传进来的data
    childrenKey: {
      type: String,
      default: 'children'
    },
    // 每一个主项和子项的名称的字段，用以兼容传进来的data
    nameKey: {
      type: String,
      default: 'name'
    },
    // 是否展示子项为空的项，是：数据返回中携带选择的子项为空的主项的KEY，否：只返回子项的KEY
    showNull: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      activeKey: '',
      checkList: []
    }
  },
  watch: {
    data (val) {
      this.changeDataFormat(val)
    }
  },
  computed: {
    nameMaxWidth () {
      return this.itemWidth > 85 ? this.itemWidth - 85 + 'px' : '80px'
    },
    componentWidth () {
      return 
    }
  },
  mounted () {
    this.changeDataFormat(this.data)
  },
  methods: {
    // 更改data结构和兼容data的字段名称
    changeDataFormat (data) {
      let checkList = data.map(item => {
        let children = item[this.childrenKey] instanceof Array ? item[this.childrenKey] : []
        children = children.map(sItem => ({
          key: sItem[this.primaryKey],
          isCheck: false, // 子项选择状态
          name: sItem[this.nameKey]
        }))
        return {
          key: item[this.primaryKey],
          children,
          name: item[this.nameKey],
          isIndeterminate: false, // checkbox选择了但是未全选状态控制
          isCheck: false, // 主项选择状态
          subLen: children.length, // 子项的个数
          subCheckLen: 0 // 子项已选择的个数，配合subLen计算选择状态
        }
      })
      this.showNull || (checkList = checkList.filter(item => item.subLen))
      this.checkList = checkList
    },
    // 展开关闭子弹层
    showSecondSelection (v) {
      this.activeKey = this.activeKey === v ? '' : v
    },
    // 主项全选和全不选事件触发
    superBoxChange (e, current) {
      // 根据主项状态，赋值子项全选、全不选
      current.children = current.children.map(item => {
        item.isCheck = e
        return item
      })
      // 全选或全不选的时候 Indeterminate 状态都为 false
      current.isIndeterminate = false
      // 全选或全不选的时候 子项选择的数量
      current.subCheckLen = e ? current.subLen : 0
      // 将当前状态返回给父组件
      this.setValueToParent()
    },
    // 子项选择和取消选择事件触发
    subBoxChange (e, current) {
      // 选择时 子项选择的数量 +1，取消选择时  子项选择的数量 -1
      current.subCheckLen = e ? current.subCheckLen + 1 : current.subCheckLen - 1
      current.isIndeterminate = !!(current.subCheckLen && current.subCheckLen !== current.subLen)
      current.isCheck = current.subCheckLen === current.subLen
      this.setValueToParent()
    },
    // 将值传递到父组件
    setValueToParent () {
      const subCheckList = []
      const showNull = this.showNull
      // 获取全部的选择的子项的key, 如果主项的子项为空同时主项全选了，那么返回主项的key
      this.checkList.forEach(item => {
        if (showNull && !item.subLen && item.isCheck) {
          subCheckList.push(item.key)
        }
        item.children.forEach(sItem => {
          sItem.isCheck && subCheckList.push(sItem.key)
        })
      })
      // typpe = checkbox，触发表单的input事件，将值赋值给v-model中的字段
      this.$emit('input', subCheckList)
    }
  }
}
</script>
<style scoped>
</style>
