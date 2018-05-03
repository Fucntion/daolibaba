
<template>
  <div class="wrap">
    <div class="list-wrap">
      <mt-loadmore :bottom-method="getScores" :autoFill="false" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="score padding10" v-for="(score,idx) in scores" :key="idx">
          <div class="user font14">
            <img class="headimg" :src="score.user.headimgurl"/>
            <span class="nickname">{{score.user.nickname}}</span>
            <span class="inputtime">{{score.create_time}}</span>
          </div>
          <div class="specs padding10-r">
            <span class="font12">规格:<span v-for="(spec,index) in score.specs">{{spec.title}}:{{spec.val}};</span></span>
          </div>
          <div class="content font14">{{score.content}}</div>
          <div class="pic"></div>

        </div>
        <div class="score padding10" v-for="(score,idx) in scores" :key="idx">
          <div class="user font14">
            <img class="headimg" :src="score.user.headimgurl"/>
            <span class="nickname">{{score.user.nickname}}</span>
            <span class="inputtime">{{score.create_time}}</span>
          </div>
          <div class="specs padding10-r">
            <span class="font12">规格:<span v-for="(spec,index) in score.specs">{{spec.title}}:{{spec.val}};</span></span>
          </div>
          <div class="content font14">{{score.content}}</div>
          <div class="pic"></div>

        </div>
        <div class="score padding10" v-for="(score,idx) in scores" :key="idx">
          <div class="user font14">
            <img class="headimg" :src="score.user.headimgurl"/>
            <span class="nickname">{{score.user.nickname}}</span>
            <span class="inputtime">{{score.create_time}}</span>
          </div>
          <div class="specs padding10-r">
            <span class="font12">规格:<span v-for="(spec,index) in score.specs">{{spec.title}}:{{spec.val}};</span></span>
          </div>
          <div class="content font14">{{score.content}}</div>
          <div class="pic"></div>

        </div>
        <div class="score padding10" v-for="(score,idx) in scores" :key="idx">
          <div class="user font14">
            <img class="headimg" :src="score.user.headimgurl"/>
            <span class="nickname">{{score.user.nickname}}</span>
            <span class="inputtime">{{score.create_time}}</span>
          </div>
          <div class="specs padding10-r">
            <span class="font12">规格:<span v-for="(spec,index) in score.specs">{{spec.title}}:{{spec.val}};</span></span>
          </div>
          <div class="content font14">{{score.content}}</div>
          <div class="pic"></div>

        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import {score} from "../../../service/getData";

  export default {
  data () {
    return {
      scores:[],
      page:1,
      allLoaded: false,
      bottomStatus: '',
    };
  },

  components: {},
  created(){
    this.getScores()
  },
  computed: {},

  methods: {
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    getScores(){
      score({
        goods_id: this.$route.params.id,
        action:'score',
        page:this.page
      }).then(res=>{
        if(res.body.code==1){
          this.page++;
          this.scores = this.scores.concat(res.body.data.data)
        }
      })
    }
  }
}

</script>
<style lang='less' scoped>
  .wrap{
    .list-wrap{
      .score{
        margin-bottom: 10px;
        background: white;
      }
    }
  }
  .score{
    .user{
      display: flex;
      .headimg{
        width: 44px;
        height: 44px;
      }
      .nickname{
        display: inline-block;
        padding: 0 10px;
        line-height: 44px;
      }
      .inputtime{
        flex:1;
        text-align: right;
        color: #666666;
        font-size: 12px;
        line-height: 44px;
      }

    }
    .specs{
      color: #666666;
    }
    .content{
      color: #333333;
      word-wrap: break-word;
    }
  }
</style>
