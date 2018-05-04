<template>
  <div :class="{'fiexd':popupVisible}">
    <head-box head-title="资金提现" go-back="true"  quick="true"></head-box>

    <div v-if="card&&card.id" class="fieldset" style="padding-bottom: 10px">
      <div @click="openPop('up')"><mt-cell title="开户行" :value="card.bank_name"></mt-cell></div>
      <mt-field label="开户行选择" placeholder="开户行选择" type="text" v-model="card.bank_name"></mt-field>
      <mt-field label="开户行网点" placeholder="开户行网点" type="text" v-model="card.bank_subbranch"></mt-field>
      <mt-field label="开户姓名" placeholder="开户姓名" type="text" v-model="card.bank_username"></mt-field>
      <mt-field label="卡号" placeholder="卡号" type="number" v-model="card.bank_num"></mt-field>
      <div class="margin10-c" @click="upCard()">
        <mt-button size="large" >修改信息</mt-button>
      </div>
    </div>
    <div v-else class="fieldset" style="padding-bottom: 10px">
      <div @click="openPop('add')"><mt-cell title="选择开户行" :value="post.bank_name"></mt-cell></div>
      <mt-field label="开户行网点" placeholder="开户行网点" type="text" v-model="post.bank_subbranch"></mt-field>
      <mt-field label="开户姓名" placeholder="开户姓名" type="text" v-model="post.bank_username"></mt-field>
      <mt-field label="卡号" placeholder="卡号" type="number" v-model="post.bank_num"></mt-field>
      <div class="margin10-c" @click="setCard()">
        <mt-button size="large" type="primary">设置信息</mt-button>
      </div>

    </div>

    <mt-popup
      v-model="popupVisible"
      position="bottom" class="bank-box">
      <div @click="selectBank(bank)" v-for="(bank,idx) in bankArr" :key="idx">
        <mt-cell :title="bank.name"></mt-cell>
      </div>
    </mt-popup>

    <div v-if="card&&userinfo.id" class="fieldset" style="padding-bottom: 10px">
      <mt-cell title="可提现金额" :value="userinfo.cashing_money"></mt-cell>
      <mt-cell title="冻结金额" :value="userinfo.freeze_money"></mt-cell>
      <mt-cell title="已提现金额" :value="userinfo.cashed_money"></mt-cell>
      <mt-cell title="提现规则">
        <span>- 24小时可提现次数3次<br>- 单次提现最小金额50元<br>- 单次提现最大金额10000元<br>- 提现费率1%<br>- 提现费率最小值1元<br>- 提现费率封顶值50元<br></span>
      </mt-cell>
      <mt-field label="提现金额" placeholder="50元起提" type="number"  v-model="number"></mt-field>
      <div class="margin10-c" @click="send()">
        <mt-button size="large" type="primary">发起提现</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import headBox from '../../../components/head';
  import {sellerWithdraw, getUser} from "../../../service/getData";

  export default {
    data() {
      return {
        card: null,
        number: null,
        userinfo: null,
        popupVisible:false,
        popupType:null,
        bankArr:[],
        post:{
          bank_id:null,
          bank_name: null,
          bank_num: null,
          bank_subbranch: null,
          bank_username: null,

        }
      };
    },

    components: {headBox},

    computed: {},
    methods: {
      openPop(type){
        this.popupVisible = true
        this.popupType = type
      },
      selectBank(bank){
        this.popupVisible = false
        if(this.popupType=='up'){
          this.card.bank_id = bank.id;
          this.card.bank_name = bank.name;
        }
        if(this.popupType=='add'){
          this.post.bank_id = bank.id;
          this.post.bank_name = bank.name;
        }

      },
      getCard() {
        sellerWithdraw({
          action: 'add'
        }).then(res => {
          if (res.body.code == 1) {
            this.card = res.body.data
          }else{
            sellerWithdraw({
              action:'bank'
            }).then(resp=>{
              if(resp.body.code==1){
                this.bankArr = resp.body.data
              }
            })
          }
        })
      },
      send(){

        if(this.userinfo.cashing_money<parseInt(this.number)){
          this.$root.mint.alertMsg('请输入小于最大提现金额的数字');
          return false;
        }
        if(this.number<50){
          this.$root.mint.alertMsg('单词提现金额不低于50元');
          return false;
        }
        sellerWithdraw({
          action:'post',
          user_card_id:this.card.id,
          number:this.number
        }).then(res=>{
          if(res.body.code==1){
            this.$root.mint.messagesBox('提前申请已提交，等待审核');
            this.$router.push({
              path:'/seller/cash'
            })
          }
        })
      },
      setCard(){
        let post = this.post;
        post.action = 'addSet';
        sellerWithdraw(post).then(res=>{
          if(res.body.code==1){
            this.$root.mint.messagesBox('新增成功',false);
            this.getCard();
          }
        })
      },
      upCard(){
        let post = this.card;
        post.action = 'upSet';
        sellerWithdraw(post).then(res=>{
          if(res.body.code==1){
            this.$root.mint.messagesBox('更新成功',false);
            this.getCard();
          }
        })
      }
    },
    created() {
      this.getCard()//获取卡的信息
      getUser().then(res=>{
        if(res.body.code==1){
          this.userinfo = res.body.data
        }
      })
    },


  }

</script>
<style lang='less' scoped>
  @import "../../../assets/style/base.less";

  .fieldset {
    margin-top: 10px;
    background: white;
  }
  .bank-box{
    width: 100%;
    overflow-y: scroll;
  }
  .fiexd{
    position: fixed;
  }
</style>
