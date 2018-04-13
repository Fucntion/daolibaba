<!--  -->
<template>
  <div>
      <head-box head-title="个人中心" goBack="true">
        <i slot="edit" class="iconfont icon-more"></i>
      </head-box>
        <div class="header-wrap padding10">
            <div class="my-header">
                <div class="userinfo">
                    <div class="avatar">
                        <img src="http://o2o.qingclouds.cn/file/upload/201804/06/094500621.jpg" class="avatar-img" />
                    </div>
                    <div class="info">
                        <div class="line nickname">function0917</div>
                        <div class="line account">通信证: 159qaz951zaq</div>
                        <div class="line point">积分6666</div>
                    </div>
                </div>
                <div class="edit-btn">编辑<i class="iconfont icon-fabu"></i></div>
            </div>
        </div>
        <div class="my-order margin15-r">
            <div class="order"><i class="iconfont icon-fukuan"></i><span class="key">待付款</span></div>
            <div class="order"><i class="iconfont icon-ziyuan"></i><span class="key">待收货</span></div>
            <div class="order"><i class="iconfont icon-daipingjia20"></i><span class="key">待评价</span></div>
            <div class="order"><i class="iconfont icon-icondd2"></i><span class="key">所有订单</span></div>
        </div>
        <div class="my-assets ">
            <div class="assets"><span class="value">342</span><span class="key">可用余额</span></div>
            <div class="assets"><span class="value">342</span><span class="key">冻结余额</span></div>
            <div class="assets"><span class="value">342</span><span class="key">积分</span></div>
            <div class="assets"><i class="iconfont icon-zhanghuzichan"></i><span>我的财富</span></div>
        </div>
        <div class="my-lnks margin15-r">
            <div class="lnks"><span class="value">342</span><span class="key">我的评论</span></div>
            <div class="lnks"><span class="value">342</span><span class="key">关注的店铺</span></div>
            <div class="lnks"><span class="value">342</span><span class="key">收藏的商品</span></div>
            <div class="lnks"><span class="value">342</span><span class="key">浏览记录</span></div>
        </div>
        <slip-box class="margin10-r"  title="为您推荐">
          <div slot="list">
              <mall-list :lists="malls"></mall-list>
          </div>
      </slip-box>
      
      <foot-box active="my"></foot-box>
  </div>
</template>

<script>
import headBox from '@/components/head'
import footBox from '@/components/foot'
import slipBox from '@/components/slip'
import {mall} from '@/service/getData'
import mallList from '../mall/components/list'

export default {
  data () {
    return {
      malls:[],
    }; 
  },

  components: {
      headBox,footBox,mallList,slipBox
  },

  computed: {},


  methods: {
    getMall(){
      let mise = mall({
        size:20,
        paginate:true,
      })
      mise.then((res) => {
          let body = res.body;
          if (body.code === 1) {
              this.malls = res.body.data.data
          }
      })
    }
      
      
      
  },
  created(){

    this.getMall()

  }
}

</script>
<style lang='less' scoped>
@import "../../assets/style/base.less";
.my-order{
    display: flex;
    height: 72px;
    background: white;
    .order{
        flex: 1;
        text-align: center;
        padding: 15px;
        .iconfont{

        }
        .key{
            color:@grayFontColor;
        }
        span{
            font-size: 12px;
            display: block;
        }
    }
}
.my-assets{
    display: flex;
    height: 72px;
    background: white;
    .assets{
        flex: 1;
        text-align: center;
        padding: 15px;
        .iconfont{

        }
        .value{
            line-height: 26px;
            font-size: 16px;
            color: @activeColor;
        }
        .key{
            color:@grayFontColor;
        }
        span{
            font-size: 12px;
            display: block;
        }
    }
}
.my-lnks{
    display: flex;
    height: 72px;
    background: white;
    .lnks{
        flex: 1;
        text-align: center;
        padding: 15px;
        .iconfont{

        }
        .value{
            line-height: 26px;
            font-size: 16px;
           
        }
        .key{
            color:@grayFontColor;
        }
        span{
            font-size: 12px;
            display: block;
        }
    }
}
.header-wrap{
    background: white;
}
.my-header{
    overflow: hidden;
    position: relative;
    border-radius: 6px;
    font-size: 12px;
    color: #fff;
    background: -webkit-linear-gradient(left,#eb3c3c,#ff7459);
    background: linear-gradient(90deg,#eb3c3c,#ff7459);
    box-shadow: 0 2px 5px rgba(255,98,98,.4);
    .userinfo{
        padding: 25px 15px;
        display: flex;
        .avatar{
            margin-right: 10px;
            width: 60px;
            height: 60px;
            border-radius: 60px;
            border: 1px solid hsla(0,0%,100%,.4);
            .avatar-img{
                 width: 60px;
                height: 60px;
                display: block;
                border-radius: 60px;
            }
            
        }
        .info{
            .line{
                margin-top: 4px;
            }
            .nickname{

            }
            .account{
                color: #e7e7e7;
            }
            .point{

            }
        }
    }
    .edit-btn{
        position: absolute;
        right: 10px;
        top: 10px;
        color: #e7e7e7;
        height: 20px;
        line-height: 20px;
        
        .icon-fabu{
            font-size: 16px;
        }
    }
}
</style>