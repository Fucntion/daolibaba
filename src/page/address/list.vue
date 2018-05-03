<!-- 选择已有地址 -->
<template>
  <div class="addr-wrap">
    <head-box head-title="收货地址管理" go-back="true"></head-box>
    <div class="address padding10" v-for="(address,idx) in addressArr">
      <div class="info-line" @click="select(address)">
        <span v-if="address.ismain==1">姓名:<em>{{address.link}}</em> <span style="color: #e93b3d">[默认地址]</span></span>
        <span v-else>姓名:<em>{{address.link}}</em></span>
        <span>联系方式:<em>{{address.tel}}</em></span>
      </div>
      <div class="info-line" @click="select(address)">
        <span>详细地址:<em>{{address.provience}} {{address.city}} {{address.area}} {{address.detail}}</em></span>
      </div>
      <div class="info-line control">
        <mt-button v-if="address.ismain!=1" class="btn" type="primary" @click="setDefault(address)" size="small"  >设为默认</mt-button>
        <!--<mt-button class="btn" size="small" type="primary" >编辑</mt-button>-->
        <mt-button class="btn" @click="del(address)" size="small" type="danger" >删除</mt-button>
      </div>
    </div>
    <div class="margin15 padding15-r">
      <router-link to="/address/add"><mt-button size="large" type="primary" >新增收货地址</mt-button></router-link>
    </div>

  </div>
</template>

<script>
  import headBox from '../../components/head';
  import {address} from "../../service/getData";
  import { mapState, mapMutations } from "vuex";
  import {getStore,setStore} from "../../util/utils";

  export default {
  data () {
    return {
      addressArr:[]
    };
  },

  methods:{
    ...mapMutations(["CHOOSE_ADDRESS"]),
    select(addr){

      if(this.isSelect){

        this.CHOOSE_ADDRESS({ address:addr});
        this.$router.push({
          path:'/confirmOrder'
        })
      }
      //如果是选择模式

    },
    del(addr){
      address({
        action:'delete',
        id:addr.id
      }).then(res=>{
        if(res.body.code==1){
          this.$root.mint.messagesBox('删除成功',false);
          this.getAddr()
        }
      })
    },
    setDefault(addr){
      if(addr.ismain==1){
        this.$root.mint.alertMsg('改地址已经是默认地址了');
        return;
      }
      address({
        action:'setDefault',
        id:addr.id
      }).then(res=>{
        if(res.body.code==1){
          this.$root.mint.messagesBox('更新成功',false);
          this.getAddr()
        }
      })
    },
    getAddr(){
      address({
        size:0
      }).then(res=>{
        this.addressArr = res.body.data
      })
    }
  },
  components: {headBox},
  created(){
    if(this.$route.query.select){
      sessionStorage.setItem('select',1);
    }
    this.getAddr()
  },
  computed: {
    isSelect(){
      return this.$route.query.select||sessionStorage.getItem('select')
    }
  },

  mounted(){
    this.$nextTick(function(){
      console.log(window.screen.height)
      document.querySelector('.addr-wrap').style.height = window.screen.height+'px';
    })
  },

}

</script>
<style lang='less' scoped>
  .addr-wrap{
    background: white;
  }
  .address{
    font-size: 14px;
    background: white;
    border-bottom: 1px solid #e7e7e7;
    .info-line{
      margin-top: 6px;
      display: flex;
      justify-content: space-between;
      &.control{
        justify-content: flex-end;
        .btn{
          height: 30px;
          font-size: 12px;
          border-radius: 0;
          box-shadow: none;
          margin-right: 10px;
        }
      }
    }
  }
</style>
