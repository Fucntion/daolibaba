import {search} from "../../../service/getData";
<template>
  <div>
    <head-box head-title="商品管理" quick="true">
      <div slot="search"></div>
    </head-box>
    <div class="malls">
      <mt-loadmore :bottom-method="getMall" :autoFill="false" @bottom-status-change="handleBottomChange"
                   :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="mall" v-for="(mall,idx) in malls" :key="idx">
          <div class="head">
            <img :src="mall.thumb" class="thumb"/>
            <div class="info">
              <div class="info-line title">{{mall.title}}</div>
              <div class="info-line">共销售{{mall.sales}}件 共浏览{{mall.hits}}次</div>

            </div>
          </div>
          <div class="control">
            <mt-button size="small" @click="changeStatus('up',mall.id,mall)" v-if="mall.status!=3" type="danger">上架
            </mt-button>
            <mt-button size="small" @click="changeStatus('down',mall.id,mall)" v-else type="danger">下架</mt-button>
            <router-link :to="'seller/mall/'+mall.id">
              <mt-button size="small" type="primary">详细信息</mt-button>
            </router-link>
          </div>
        </div>

      </mt-loadmore>
    </div>
    <foot-box active="home"></foot-box>

  </div>
</template>

<script>
  import headBox from '../../../components/head';
  import footBox from '../components/foot';
  import {selerMall} from "../../../service/getData";

  export default {
    data() {
      return {
        malls: [],
        page: 1,
        allLoaded: false,
        bottomStatus: '',
      };
    },

    components: {footBox, headBox},

    computed: {},

    created() {
      this.getMall()
    },
    mounted() {
      this.$nextTick(function () {
        // document.querySelector('.malls').style.height = window.screen.height-54-44+'px';
      })
    },
    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      changeStatus(action, id, mall) {
        selerMall({
          action: action,
          id: id
        }).then(res => {
          if (res.body.code == 1) {
            this.$root.mint.messagesBox('操作成功', false);

            if (action == 'up') {
              mall.status = 3;
            } else {
              mall.status = 0;
            }
          }
        })
      },
      getMall() {

        selerMall({
          paginate: 1,
          size: 20,
          page: this.page
        }).then(res => {
          if (res.body.code == 1) {
            this.malls = this.malls.concat(res.body.data.data)
            this.page++;
            this.$refs.loadmore.onBottomLoaded();
          }
        })
      }
    }
  }

</script>
<style lang='less' scoped>
  @import "../../../assets/style/base.less";

  .malls {
    background: white;

    .mall {
      margin-bottom: 10px;
      padding: 10px;
      border-bottom: 1px solid #e7e7e7;
      background: white;

      .head {

        display: flex;
        .thumb {
          width: 80px;
          height: 80px;
        }
        .info {
          flex: 1;
          padding: 0 10px;
          font-size: 12px;
          color: #666666;
          .info-line {
            margin-bottom: 6px;
          }
          .title {
            font-size: 14px;
            color: #333333;
          }
        }
      }
      .control {
        text-align: right;
        button {
          height: 28px;
          font-size: 12px;

        }
      }
    }
  }
</style>
