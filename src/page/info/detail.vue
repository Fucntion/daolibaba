<template>
 <div>
  <head-box head-title="资讯详情" go-back="true"></head-box>
   <div class="title block padding10 ">{{info.title}}</div>
   <div class="base border-b flex block padding10">
     <div class="info-line">发布者:{{info.user.nickname}}</div>
     <div class="info-line">时间:{{info.create_time}}</div>
     <!--1是正常的，3是用户标记完结的，0是用户自己关闭的。-1是未审核通过的-->
     <div v-if="info.status==1" class="info-line">状态:正常</div>
     <div v-if="info.status==3" class="info-line">状态:已完结</div>
     <div v-if="info.status==0" class="info-line">状态:已关闭</div>
     <div v-if="info.status==-1" class="info-line">状态:未通过审核</div>
   </div>
   <div class="base block padding10 font14">
     <div class="info-line price">￥<em>{{info.money|cutPrice(0)}}</em>{{info.money|cutPrice(1)}}元</div>
     <div class="info-line">联系方式:{{info.link||'暂无'}}</div>
   </div>



   <div class="imgs block" slot="list">
     <img :src="pic.url" class="img" @click="preview(idx)" v-for="(pic,idx) in info.pic" />
   </div>
   <div class="block padding10" v-if="info.con" v-html="info.con.content"></div>

   <!--<div class="imgs">-->
     <!--<img  />-->
   <!--</div>-->
  <div class="control padding15-r">
    <div @click="agree()" class="agree"><i class="iconfont icon-dianzan "></i><span class="font12">点赞({{info.agreeCount}})</span></div>
    <div @click="toggelPopup()" class="comment"><i class="iconfont icon-iconfontpinglun"></i><span class="font12">评论({{comments.length}})</span></div>
  </div>



   <slip-box  title="最新评论">
     <ul class="comments" slot="list">


         <li class="comment"
             v-for="(comment,idx) in comments"
             :key="idx">
           <img class="thumb" :src="comment.user.headimgurl" />
           <div class="info">
             <div class="user">
               <span>{{comment.user.nickname}}</span>
               <span>{{comment.create_time}}</span>
             </div>
             <div class="content">{{comment.content}}</div>

           </div>

         </li>
       <div class="margin10">
         <mt-button @click="getComment()" type="default" size="large" >加载更多</mt-button>
       </div>



     </ul>

   </slip-box>

   <mt-popup class="popupbox"
     v-model="popupVisible"
     position="right">
     <div class="content border margin15">
       <mt-field label="" placeholder="评论的内容" type="textarea" rows="4" v-model="commentContent"></mt-field>
     </div>
     <div class="margin10">
       <mt-button @click="sub()" type="primary" size="large" >提交</mt-button>
     </div>
     <i @click="toggelPopup" class="iconfont icon-LC_icon_close_circle_line close"></i>
   </mt-popup>
 </div>
</template>

<script>
  import headBox from '../../components/head';
  import {info} from "../../service/getData";
  import slipBox from '../../components/slip';
  export default {
    data () {
      return {
        info:{},
        popupVisible:false,
        commentContent:null,
        page:1,
        comments:[],
        allLoaded: false,
        bottomStatus: '',
      };
    },
    components:{headBox,slipBox},
    methods: {
      agree(){

        info({
          action:'agree',
          id:this.$route.params.id,
        }).then(res=>{
          if(res.body.code==1){
            this.info.agreeCount++;
            this.$root.mint.messagesBox('操作成功',false)
          }
        })

      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      preview(idx){
        let index = idx||0;

        let current = this.info.pic[index].url,
            urls = [];
        this.info.pic.map(function(pic){
          urls.push(pic.url)
        })
        this.$root.wx.previewImage({
          current: current, // 当前显示图片的http链接
          urls: urls // 需要预览的图片http链接列表
        });

      },
      toggelPopup(){
        this.popupVisible = !this.popupVisible;
      },
      getComment(){
        info({
          action:'comment',
          itemid:this.$route.params.id,
          mid:2,
          with:'user',
          paginate:1,
          order:'create_time desc',
          page:this.page
        }).then(res=>{
          if(res.body.code==1){
            this.page++;
            this.comments = this.comments.concat(res.body.data.data)

          }
        })
      },
      sub(){

        this.toggelPopup()

        info({
          action:'addComment',
          id:this.$route.params.id,
          content:this.commentContent
        }).then(res=>{
          if(res.body.code==1){
            this.commentContent = null
            this.$root.mint.messagesBox('评论成功',false)
          }
        })

      },
    },
    created(){

      //基础信息
      info({
        id:this.$route.params.id,
        with:'pic,user,con',
      }).then(res=>{
        if(res.body.code==1){
          this.info = res.body.data
        }
      })

      this.getComment()




    },


    computed: {},



  }

</script>
<style lang='less' scoped>
  .comments{

    .comment{
      display: flex;
      padding: 10px;
      border-bottom: 1px solid #e7e7e7;
      overflow-x: hidden;
      &:last-child{
        border-bottom: none;
      }
      .thumb{
        height: 44px;
        width: 44px;
        margin: 10px 10px 10px 0;
      }
      .info{
        color: #666666;
        flex: 1;
        .user{

          font-size: 12px;
          display: flex;
          justify-content: space-between;
        }
        .content{
          /*margin: 10px;*/
          font-size: 14px;
          word-break:break-all;
          line-height: 1.4;

        }
      }
    }
  }

  .control{
    margin: 0 auto;
    width: 160px;
    display: flex;
    .agree,.comment{
      width: 80px;
      height: 44px;
      text-align: center;
      span{
        display:block;
        padding: 6px 0;
      }
      i{
        font-size: 28px;
      }
    }
    .agree{

    }
    .comment{

    }
  }
  .title{
    text-align: center;
  }
  img{
    max-width: 100%;
  }
  .flex{
    display: flex;
    div{
      flex: 1;
      text-align: center;
      font-size: 14px;
      color: #666666;
    }
  }

  .popupbox{
    width: 100%;

    height:100%;
    background-color: #fff;
  }

  .close{
   position: fixed;
    bottom: 40px;
    font-size: 36px;
    left: 50%;
    margin-left: -18px;
    color: #666666;
  }
  .imgs{
    padding: 10px;
    height: 2.4155rem;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    .img{
      margin-right: 4px;
      height: 120px;
    }
  }

  .price{
    em{
      padding: 0 4px;
      font-size: 18px;
    }
  }


</style>
