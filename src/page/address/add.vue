<!-- 新增收货地址 -->
<template>
  <div>
    <head-box head-title="新增收货地址" go-back="true"></head-box>
    <div class="padding15">
      <mt-button @click="openAddress()" class="to" size="large" >共享微信收货地址</mt-button>
    </div>
    <mt-field label="联系人" placeholder="" v-model="link"></mt-field>
    <mt-field label="电话" placeholder="" type="tel"  v-model="tel"></mt-field>
    <mt-field label="省份" placeholder=""  v-model="province"></mt-field>
    <mt-field label="城市" placeholder=""  v-model="city"></mt-field>
    <mt-field label="区县" placeholder=""  v-model="area"></mt-field>
    <mt-field label="邮编" placeholder=""  v-model="postalCode"></mt-field>
    <mt-field label="详细地址" placeholder="" v-model="detail"></mt-field>
    <div class="padding15">
      <mt-button @click="sub()" type="primary" class="to" size="large" >保存地址</mt-button>
    </div>
  </div>
</template>

<script>
  import headBox from '../../components/head';
  import {address} from "../../service/getData";

  export default {
  data () {
    return {

      detail:null,
      link:null,
      tel:null,
      province:null,
      city:null,
      area:null,
      postalCode:null,
    };
  },
  components: {headBox},
  created(){
    this.$root.utils.getWxConfig()
  },
  computed: {},

  methods: {
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    openAddress(){
      let _self = this
      this.$root.wx.openAddress({
        success: function (res) {
          _self.$root.mint.alertMsg('获取地址成功,请提交')
          _self.link = res.userName; // 收货人姓名
          _self.postalCode = res.postalCode; // 邮编
          _self.province = res.provinceName; // 国标收货地址第一级地址（省）
          _self.city = res.cityName; // 国标收货地址第二级地址（市）
          _self.area = res.countryName; // 国标收货地址第三级地址（国家）
          _self.detail = res.detailInfo; // 详细收货地址信息
          _self.tel = res.telNumber; // 收货人手机号码
        },
        fail:function (res) {
          _self.$root.mint.alertMsg('请先微信中新增地址')
        }
      })
    },
    sub(){

      address({
        action:'add',
        detail:this.detail,
        link:this.link,
        tel:this.tel,
        province:this.province,
        city:this.city,
        area:this.area,
        postalCode:this.postalCode
      }).then(res=>{
          if(res.body.code==1){
            this.$root.mint.messagesBox('新增成功',false);
            this.$router.push({
              path:'/address'
            })
          }
      })

    }
  }
}

</script>
<style lang='less' scoped>
  .mint-field{
    border-bottom: 1px solid #e8e8e8;
  }
</style>
