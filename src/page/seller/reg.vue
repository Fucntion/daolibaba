<!-- 折叠列表 -->
<template>
  <div>
    <!-- 标题栏 -->
    <head-box head-title="商家认证" go-back="true"></head-box>
    <div v-if="!apply">
      <mt-field label="主体名称*" placeholder="请与营业执照一致" v-model="name"></mt-field>
      <mt-field label="联系人" placeholder="审核过程中可能会与您联系" v-model="link"></mt-field>
      <mt-field label="邮箱" placeholder="请填写有效邮箱" v-model="email"></mt-field>
      <mt-field label="联系方式" placeholder="联系方式" type="tel" v-model="tel"></mt-field>
      <mt-cell label="上传证明材料图片，包括但不限于营业执照、法人身份证照片。特殊行业请上传对应资质文件" ></mt-cell>
      <div  style="width:100%;" class="weui-uploader__bd filebox mint-cell padding10-c">
        <ul class="weui-uploader__files" id="uploaderFiles">
          <img class="weui-uploader__file" :src="item" v-for="(item,index) in localIds" :key="index" />
        </ul>

        <div class="weui-uploader__input-box">
          <div  id="uploaderInput" class="weui-uploader__input" @click="chooseImage()"> </div>
        </div>
      </div>
      <div class="padding15" @click="sub()" > <mt-button type="primary" size="large">提交申请</mt-button></div>
    </div>
    <div v-else>

      <div class="result-box padding10 block">
        <div class="success" v-if="apply.status==1">
          <i class="icon iconfont icon-tipssuccess"></i>
          <h4 class="msg">认证通过</h4>
        </div>
        <div class="fail" v-else>
          <i class="icon iconfont icon-cuowuhttp"></i>
          <h4 class="msg">请耐心等待审核</h4>
        </div>

      </div>

    </div>






  </div>
</template>

<script>
  import headBox from '../../components/head';
  import {apply} from "../../service/getData";

  export default {
    name: 'sellerReg',
    components: {
      headBox
    },
    data() {
      return {
        name: null,
        link:null,
        email:null,
        tel: null,
        pics: [],
        localIds:[],
        userInfo:null,
        apply:null
      }
    },
    created() {
      apply().then(res=>{
        if(res.body.code==1){
          this.apply = res.body.data;
        }
      })

    },
    methods: {

      sub() {

        apply({
          action: 'add',
          name:this.name,
          link:this.link,
          email:this.email,
          tel:this.tel,
          pics:this.pics
        }).then(res=>{
          if(res.body.code==1){
            this.$root.mint.messagesBox('申请提交成功',false);
            setTimeout(function(){
              location.reload();
            },1500)
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
  .result-box{
    padding: 30px 15px;
    text-align: center;
    .success,.fail{

      .icon{
        font-size: 60px;
        &.icon-tipssuccess{
          color: #50b674;
        }
      }
      .msg{

      }
    }
    .base{
      margin-top: 15px;
      color: #666666;
      font-size: 14px;
      .info-line{
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
