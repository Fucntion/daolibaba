<template>
  <div class="wrap" v-if="purchaser">
    <div class="mall-info block padding10">
      <img class="thumb" :src="purchaser.thumb"/>
      <div class="info">
        <div class="info-line">{{purchaser.title}}</div>
        <div class="info-line"><div class="price">￥{{purchaser.price}}</div></div>
      </div>
    </div>

    <div v-if="purchaser.score_id" class="control">
      <mt-cell  title="评价星级">
        <i :class="{active:star>0}" class="icon-star iconfont"></i>
        <i :class="{active:star>1}" class="icon-star iconfont"></i>
        <i :class="{active:star>2}" class="icon-star iconfont"></i>
        <i :class="{active:star>3}" class="icon-star iconfont"></i>
        <i :class="{active:star>4}" class="icon-star iconfont"></i>
      </mt-cell>
      <mt-cell  title="评论内容">

      </mt-cell>
      <div class="padding15 border">{{content}}</div>


    </div>
    <div class="control" v-else>
      <mt-cell  title="评价星级">
        <i @click="changeStar(1)" :class="{active:star>0}" class="icon-star iconfont"></i>
        <i @click="changeStar(2)" :class="{active:star>1}" class="icon-star iconfont"></i>
        <i @click="changeStar(3)" :class="{active:star>2}" class="icon-star iconfont"></i>
        <i @click="changeStar(4)" :class="{active:star>3}" class="icon-star iconfont"></i>
        <i @click="changeStar(5)" :class="{active:star>4}" class="icon-star iconfont"></i>
      </mt-cell>
      <div class="padding10 block">
        <mt-field  class="content border"  placeholder="文字评价，可选" type="textarea"  rows="4" v-model="content"></mt-field>
      </div>


      <mt-button  size="large" class="margin15-r" type="primary" @click="send()">提交</mt-button>
    </div>

  </div>
</template>

<script>

  import headBox from '../../components/head';
  import {purchaser,order} from "../../service/getData";

  export default {
    name: "score",
    data() {
      return {
        purchaser: null,
        content:null,
        star:0
      }
    },
    created() {

      purchaser({
        id: this.$route.query.id,
      }).then(res => {
        if (res.body.code == 1) {
          this.purchaser = res.body.data
          let score = res.body.data.score
          if(score){
            this.star = score.star;
            this.content = score.content;
          }
        }
      })
    },
    components: {headBox},
    methods: {
      changeStar(star){
        this.star =star
      },
      send(){
        if(this.star<1){
          this.$root.mint.alertMsg('请选择评分哦');
          return;
        }
        order({
          action:'score',
          star:this.star,
          purchaserId:this.$route.query.id,
          content:this.content
        }).then(res=>{
          if(res.body.code==1){
            this.$root.mint.messagesBox('评价成功',false);
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/style/base.less";

  .wrap {
    margin-top: 10px;
    position: relative;
    .control {
      margin: 10px 0;
      padding: 10px;
      background: white;
      border-bottom: 1px solid #e7e7e7;
      box-sizing: border-box;
      z-index: 2;

      .iconfont{
        color: #666666;
        &.active{
          color: @activeColor;
        }
      }

      .content{
        .border;
        margin-bottom: 10px;
        border-radius: 2px;
      }

    }
    .mall-info{
      display: flex;

      .thumb{
        width: 60px;
        height: 60px;
      }
      .info{
        padding: 0 10px;
      }
    }

  }


</style>
