<template>
  <div id="app">
    <CascadeTree
      v-model="subData"
      :data="data"
      :popup-max-height="200"
      primary-key="id"
      children-key="children"
      name-key="title"
      :column="3">
    </CascadeTree>
  </div>
</template>

<script>
import CascadeTree from './components/CascadeTree'
export default {
  name: 'app',
  components: {
    CascadeTree
  },
  watch: {
    val (v) {
      console.log(v)
    }
  },
  data () {
    return {
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
              title: '围场满族蒙古族自治县围场满族蒙古族自治县'
            }, {
              id: '130930',
              title: '孟村回族自治县'
            }
          ]
        }, {
          id: '150000',
          title: '满洲里市',
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
      subData: [],
      val: ''
    }
  }
}
</script>

<style>
#app {
  margin-left: 40px;
}
</style>
