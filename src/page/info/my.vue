<template>
  <div>
    <head-box head-title="管理资讯" go-back="true" ></head-box>

      <ul class="o2o-hot-list block">
        <mt-loadmore :bottom-method="getInfo" :autoFill="false" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
          <ul class="o2o-hot-list padding10-c">
            <div  v-for="(info,idx) in infos" :key="info.id" class="item padding10-r  font14">
              <div class="info">
                <h4 class="title">{{info.title}}</h4>
                <div class="pic-box">
                  <div class="pic"
                       :style="{backgroundImage:'url('+pic.url+')'}" v-for="(pic,idx) in info.pic"></div>
                </div>
                <div class="desc">
                  <span class="keyword px12">{{info.title|cutstr(20)}}..</span>
                  <span class="inputtime">{{info.create_time}}</span>
                </div>
                <div class="control">
                  <mt-button class="del-btn" @click="del(info.id,idx)" size="small" type="danger">删除</mt-button>
                </div>
              </div>
            </div>
          </ul>
        </mt-loadmore>

      </ul>
    </div>

</template>

<script>
  import headBox from '../../components/head'

  import {info} from '../../service/getData'

  export default {
    data () {
      return {
        page:1,
        infos:[],
        allLoaded: false,
        bottomStatus: '',
      };
    },

    components: {
      headBox
    },
    watch:{

    },
    computed: {

    },

    created(){
      this.getInfo()
    },
    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      del(id,idx){
        info({
          action:'del',
          id:id
        }).then(res=>{
          if(res.body.code==1){
            this.infos.splice(idx,1)
            this.$root.mint.messagesBox('删除成功',false);
          }
        })
      },
      getInfo(){
        info({
          action:'my',
          paginate:1,
          size:20,
          with:'pic',
          page:this.page
        }).then(res=>{
          if(res.body.code==1){
            this.page++;
            this.infos = this.infos.concat(res.body.data.data)
          }
        })
      }
    }
  }

</script>
<style lang='less' scoped>
  @import '../../assets/style/base.less';




  .o2o-hot-list {
    .item {
      display: block;
      border-bottom: 1px solid #e7e7e7;
      &:last-child {
        border-bottom: none;
      }

      .info {
        .rest;
        display: block;
        .title {
          .rest;
          margin-top: 0.2415rem;
          font-size: 0.3865rem;
          /*font-weight: bold;*/
        }
        .pic-box {
          margin: 0.2415rem 0;
          overflow-x: scroll;
          white-space: nowrap;
          .pic {
            display: inline-block;
            margin-right: 6px;
            width: 60px;
            height: 60px;


            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          }

        }
        .desc {
          display: flex;
          justify-content: space-between;
          .keyword {
            color: #666666;
          }
          .inputtime {
            width: 0.9662rem;
            text-align: center;
          }
        }
      }
    }
  }
  .control{
    padding: 10px;
    text-align: right;
    .del-btn{
      height: 26px;
      box-shadow: none;
      /*border-radius: 0;*/
    }
  }
</style>
