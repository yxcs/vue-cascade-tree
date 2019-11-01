# vue-cascade-tree  ![npm版本](https://img.shields.io/badge/npm-6.2.0-green) ![授权方式](https://img.shields.io/badge/license-ISC-green)  
当前版本 ![插件版本](https://img.shields.io/badge/plugin-1.1.*-green)

## 效果  
初始效果  
![初始效果](https://raw.githubusercontent.com/yxcs/vue-cascade-tree/master/public/images/a.png)  
展开效果  
![展开效果](https://raw.githubusercontent.com/yxcs/vue-cascade-tree/master/public/images/b.png)  
选择效果  
![选择效果](https://raw.githubusercontent.com/yxcs/vue-cascade-tree/master/public/images/c.png)  
选择后关闭  
![选择后关闭](https://raw.githubusercontent.com/yxcs/vue-cascade-tree/master/public/images/d.png)  

## 使用  
首先安装插件  
```shell
npm install vue-cascade-tree --save  
```  
然后在需要使用的地方引入  
```javascript
import CascadeTree from 'vue-cascade-tree';
components: {
  CascadeTree
}
```  
当然在全局中添加也可以  
```javascript
import CascadeTree from 'vue-cascade-tree';
Vue.set('CascadeTree');
```  
然后在需要的地方使用
```html
<template>
  <div id="app">
    <CascadeTree
      v-model="subData"
      :data="data"
      width="220px"
      popup-max-height="200px"
      primary-key="id"
      children-key="children"
      name-key="title">
    </CascadeTree>
  </div>
</template>
```
```javascript
import CascadeTree from 'vue-cascade-tree'
export default {
  name: 'app',
  components: {
    CascadeTree
  },
  data () {
    return {
      // 数据格式如下，可以更改对应的字段名称，不过要在组件上填写相应的字段名
      data: [
        {
          id: '110100',
          title: '北京市',
          children: [
            {
              id: '110101',
              title: '东城区'
            }, {
              id: '110102',
              title: '西城区'
            }, {
              id: '110105',
              title: '朝阳区'
            }, {
              id: '110106',
              title: '丰台区'
            }, {
              id: '110107',
              title: '石景山区'
            }, {
              id: '110108',
              title: '海淀区'
            }, {
              id: '110109',
              title: '门头沟区'
            }, {
              id: '110111',
              title: '房山区'
            }, {
              id: '110112',
              title: '通州区'
            }, {
              id: '110113',
              title: '顺义区'
            }, {
              id: '110114',
              title: '昌平区'
            }, {
              id: '110115',
              title: '大兴区'
            }, {
              id: '110116',
              title: '怀柔区'
            }, {
              id: '110117',
              title: '平谷区'
            }, {
              id: '110228',
              title: '密云县'
            }, {
              id: '110229',
              title: '延庆县'
            }
          ]
        }, {
          id: '120100',
          title: '天津市',
          children: []
        }, {
          id: '130000',
          title: '河北省',
          children: [
            {
              id: '130100',
              title: '石家庄'
            }, {
              id: '130181',
              title: '辛集市'
            }, {
              id: '130183',
              title: '晋州市'
            }, {
              id: '130184',
              title: '新乐市'
            }, {
              id: '130200',
              title: '唐山市'
            }, {
              id: '130281',
              title: '遵化市'
            }, {
              id: '130283',
              title: '迁安市'
            }, {
              id: '130300',
              title: '秦皇岛市'
            }, {
              id: '130826',
              title: '丰宁满族自治县'
            }, {
              id: '130827',
              title: '宽城满族自治县'
            }, {
              id: '130828',
              title: '围场满族蒙古族自治县'
            }, {
              id: '130930',
              title: '孟村回族自治县'
            }
          ]
        }, {
          id: '150000',
          title: '内蒙古自治区',
          children: [
            {
              id: '150100',
              title: '呼和浩特市'
            }, {
              id: '150722',
              title: '莫力达瓦达斡尔族自治旗'
            }, {
              id: '150724',
              title: '鄂温克族自治旗'
            }, {
              id: '150781',
              title: '满洲里市'
            }, {
              id: '150929',
              title: '四子王旗'
            }, {
              id: '152221',
              title: '科尔沁右翼前旗'
            }
          ]
        }
      ],
      subData: []
    }
  }
}
```
## 参数说明  

### 组件传递的参数说明  
```js
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
  // 整个组件分为几列
  column: {
    type: Number,
    default: 3
  },
  // 每一列的宽度
  itemWidth: {
    type: Number,
    default: 160
  },
  // 组件的弹层的最大高度，超出滚动，宽度取 [this.width]值
  popupMaxHeight: {
    type: String,
    default: '200px'
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
}
```  

### data说明
- 必须有唯一的一个key值，用以区分每一个值  
- 可以有子元素也可以没有，最多两级
- key字段、名称字段和子元素字段的名称可以更改，更改后要组件上传递更改后的字段

### v-model
用以接收选择之后的值，返回相应的key值，根据showNull字段，判断返回的值包不包含主项的值

### width
组件的宽度，非必填，但是建议填写  


## Keywords
**vue** **cascade** **tree**