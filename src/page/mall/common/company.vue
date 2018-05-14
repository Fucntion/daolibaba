<template>
  <div>
      <router-link :to="'/store/'+company.user_id" class="company"  v-if="company.malls.length>0">
            <div class="info">
                <img class="thumb" :src="company.thumb||'http://placehold.it/100/ccc'" />
                <div class="base">
                    <div class="name">{{company.company}}</div>
                    <div class="business">主营业务:{{company.business}}</div>
                    <!--<div class="star-list font14">3颗星</div>-->
                </div>
                <div class="link">
                    <mt-button class="goto font12" type="primary" size="small">进入商铺</mt-button>
                </div>
            </div>
            <div class="mall-list">

                <div class="mall" v-for="mall in company.malls">
                    <img class="thumb" :src="mall.thumb||'http://placehold.it/100/ccc'" />
                    <span class="price font12">{{mall.price}}</span>
                </div>


            </div>

        </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
props:['company'],
  components: {},

  computed: {},



  methods: {}
}

</script>
<style lang='less' scoped>
@import "../../../assets/style/base.less";
  //推荐的商家
  .top-company-list{

    .company{
      padding: 10px 0;
      border-bottom: 1px solid #e7e7e7;
      &:last-child{
        // border-bottom: none;
      }
      .info{
        .rest;
        display: flex;
        justify-content: space-between;
        .thumb{
          display: inline-block;
          width: 44px;
          height: 44px;
        }
        .base{
          width: 100%;
          padding: 0 10px;

          .name{
            margin-bottom: 6px;
            .font14;
            color: #333333;

          }
          .business{
            .font12;
            margin-bottom: 6px;
          }
          .star-list{

          }
        }
        .link{
          width: 2.4155rem;
          .goto{
            .rest;
            width: 1.4493rem;
            height: 0.7246rem;
            color: white;
            text-align: center;
            // background: @activityColor;
          }

        }
      }
      .mall-list{
        margin-top: 10px;
        height: 100px;
        white-space: nowrap;
        overflow-y: hidden;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        .mall{
          width: 72px;
          height: 100px;
          margin-right: 10px;

          display: inline-block;
          text-align: center;
          .thumb{

            width: 72px;
            height: 72px;
          }
          .price{
            display: block;
            text-align: left;
            line-height: 28px;
            color: @activeColor;
          }
        }
      }
    }
  }


</style>
