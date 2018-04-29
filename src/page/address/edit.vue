<!-- 新增收货地址 -->
<template>
  <div>31231
    <mt-field label="联系人" placeholder="请输入用户名" v-model="link"></mt-field>
    <mt-field label="电话" placeholder="请输入手机号" type="tel" v-model="tel"></mt-field>
    <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    <mt-field label="详细地址" placeholder="请输入手机号" type="tel" v-model="detail"></mt-field>
  </div>
</template>

<script>
export default {
  data () {
    return {
      detail:null,
      link:null,
      tel:null,
      province:null,
      city:null,
      area:null,
      slots: [
        {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3',
          textAlign: 'left'
        }
      ]
    };
  },
  components: {},

  computed: {},

  methods: {
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    }
  }
}

</script>
<style lang='less' scoped>
</style>
