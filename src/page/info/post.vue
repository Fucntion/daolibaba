<!-- 折叠列表 -->
<template>
  <div>
    <!-- 标题栏 -->
    <head-box head-title="发布资讯" go-back="true"></head-box>
    <mt-field label="标题*" placeholder="简介描述问题" v-model="title"></mt-field>
    <mt-field label="联系方式" placeholder="联系方式" type="tel" v-model="link"></mt-field>
    <mt-field label="收费" placeholder="无需收费则填0" type="tel" v-model="money"></mt-field>
    <div  style="width:100%;" class="weui-uploader__bd filebox mint-cell padding10-c">
      <ul class="weui-uploader__files" id="uploaderFiles">
        <img class="weui-uploader__file" :src="item" v-for="(item,index) in localIds" :key="index" />
      </ul>

      <div class="weui-uploader__input-box">
        <div  id="uploaderInput" class="weui-uploader__input" @click="chooseImage()"> </div>
      </div>
    </div>
    <mt-field label="内容*" placeholder="内容" type="textarea" v-model="content"></mt-field>

    <div class="padding15" @click="sub()" > <mt-button type="primary" size="large">发布</mt-button></div>
  </div>
</template>

<script>
  import headBox from '../../components/head'
  import {info} from "../../service/getData"
  import { mapState, mapActions } from "vuex";
  export default {
    name: 'Fold',
    components: {
      headBox
    },
    data() {
      return {
        title: null,
        link:null,
        content: null,
        pics: [],
        money: 0,
        localIds:[]
      }
    },
    created() {
      this.getUserInfo();
    },
    methods: {
      ...mapActions(["getUserInfo"]),
      sub() {
        let self = this
        info({
          action: 'add',
          title:this.title,
          content:this.content,
          pics:this.pics,
          catid:this.$route.query.catid,
          money:this.money
        }).then(res=>{
          if(res.body.code==1){
            this.$root.mint.messagesBox('发布成功',false);
            this.$router.push({
              path:'/info'
            })
          }
        })

      },
      /**
       * 得到图片的base64数据，可以用img标签显示. (此接口仅在 iOS WKWebview 下提供，用于兼容 iOS WKWebview 不支持 localId 直接显示图片的问题)
       * @param localIds
       */
      readImages(localIds) {
        let _self = this

        localIds.map(function(localId){

          _self.$root.wx.getLocalImgData({
            localId: localId,
            success: (res) => {

              _self.localIds.push(res.localData);
            },
            fail:(res)=>{
              console.log(res)
              alert(JSON.stringify(res))
            }
          })

        })


      },
      chooseImage() {
        let _self = this;
        this.$root.wx.chooseImage({
          count: 9, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

            //万一用的是最新的模式
            if (window.__wxjs_is_wkwebview) {
              _self.readImages(localIds.slice(0))
            }else{
              _self.localIds = localIds.slice(0);//浅拷贝赋值，不然到上传那里总是没图片
            }

            //创建缩略图
            _self.syncUpload(localIds)

          }
        });
      },
      syncUpload(localIds) {
        let _self = this,localId = localIds.pop();
        // var tmpl ='<li class="weui-uploader__file" style="background-image:url('+localId+')"></li>';
        if (!localId) {
          this.$root.mint.alertMsg('lcoalId参数缺失');
          return;
        }
        this.$root.wx.uploadImage({
          localId: localId.toString(),
          isShowProgressTips: 0,
          success: function (res) {

            let serverId = res.serverId; // 返回图片的服务器端ID //其他对serverId做处理的代码
            _self.pics.push(serverId);
            if (localIds.length > 0) {
              _self.syncUpload(localIds);
            }

          },
          fail: function (res) {
            this.$root.mint.alertMsg(JSON.stringify(res))
          },
          complete: function (res) {

          }
        });

        // upload_task.onProgressUpdate((res) => {
        //    console.log('上传进度', res.progress)
        // })
      },



    }
  }
</script>

<style lang="less" scoped>

</style>
