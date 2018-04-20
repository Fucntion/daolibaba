<!--  -->
<template>
  <div>
    <head-box :fixed="true" :goBack="true" head-title="选择分类" ></head-box>

    <div v-if="catArr.length>1" id="mallCategoryBody" class="category-viewport category-categoryNewUi">
        <div id="rootList" class="jd-category-tab">
            <div id="rootListBox">
                <ul id="rootUl">
                    <li v-for="(first,idx1) in catArr" :class="{'cur':activeFristIndex==idx1}" @click="changeFirstActiveIndex(idx1)" :key="idx1" m_index="idx1" :m_cid="first.id" :id="'category'+first.id" commonused="false">
                      <a class="J_ping"   href="javascript:void(0);">{{first.title}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="category-content">
            <div id="branchScroll" class="jd-category-content-wrapper">
                <div id="branchList">

                    <div v-for="(second,idx2) in catArr[activeFristIndex].child" :key="idx2" class="jd-category-div cur">
                        <h4>{{second.title}}</h4>
                        <ul class="jd-category-style-1">

                            <li v-for="(third,idx3) in second.child" :key="idx3">
                              <a class="J_ping"  report-eventlevel="2" :id="'branch_'+third.id" href="">
                                <img :src="third.thumb" :id="third.id"><span>{{third.title}}</span>
                              </a>
                            </li>


                            <div style="clear:both"></div>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>




  </div>
</template>

<script>
  import headBox from '../../components/head';
  import {getFoldList} from "../../service/getData";
  import $ from 'jquery';

  export default {
  data () {
    return {
      catArr:[],
      activeFristIndex:0,
    };
  },

  components: {headBox},

  computed: {},

    mounted(){
      this.$nextTick(function(){


        var width = $(window).width(), heigth = $(window).height() - 48.5;

        console.log($('#rootListBox'));

        $('#rootListBox').css('height', heigth);
        $('#rootUl').css('height', heigth);
        $('#branchScroll').css('width', width - 86).css('height', heigth);
        $('#branchList').css('width', width - 86).css('height', heigth);

        var slider = { //判断设备是否支持touch事件
          touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
          slider: document.getElementById('branchScroll'), //事件
          distance: 0,
          events: {
            // index:0, //显示元素的索引
            // slider:this.slider, //this为slider对象
            handleEvent: function (event) {
              var self = this; //this指events对象

              console.log(event.type)

              if (event.type == 'touchstart') {
                self.start(event);
              } else if (event.type == 'touchmove') {
                self.move(event);
              } else if (event.type == 'touchend') {
                self.end(event);
              }
            },
            //滑动开始
            start: (event) => {
              if (document.getElementById('branchList').offsetHeight < document.body.offsetHeight) {
                return
              }
              var touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
              startPos = {x: touch.pageX, y: touch.pageY, time: +new Date}; //取第一个touch的坐标值
              isScrolling = 0; //这个参数判断是垂直滚动还是水平滚动

              this.slider.slider.addEventListener('touchmove', this.slider.events, false);
              this.slider.slider.addEventListener('touchend', this.slider.events, false);
            }, //移动
            move: (event) => { //当屏幕有多个touch或者页面被缩放过，就不执行move操作

              if (event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
              var touch = event.targetTouches[0];
              endPos = {x: touch.pageX - startPos.x, y: touch.pageY - startPos.y};
              isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0; //isScrolling为1时，表示纵向滑动，0为横向滑动

              this.slider.length = endPos.y

            },
            //滑动释放
            end: (event) => {

              var duration = +new Date - startPos.time; //滑动的持续时间
              console.log(duration)
              var distanceY = endPos.y - startPos.y
              var height = document.getElementById('branchList').offsetHeight;
              this.slider.distance += distanceY;//参数
              console.log(height - document.body.offsetHeight, startPos, endPos, distanceY, this.slider.distance)
              if (this.slider.distance < 0 && Math.abs(this.slider.distance) < height - document.body.offsetHeight) {
                this.slider.slider.style.transform = "translateY(" + endPos.y + "px)"
              }

              //解绑事件
              this.slider.slider.removeEventListener('touchmove', this.slider.events, false);
              this.slider.slider.removeEventListener('touchend', this.slider.events, false);
            }
          },
          //初始化
          init: function () {
            var self = this; //this指slider对象
            console.log(self)

            if (!!self.touch) {
              console.log(self.slider)
              self.slider.addEventListener('touchstart', self.events, false); //addEventListener第二个参数可以传一个对象，会调用该对象的handleEvent属性
            }
          }
        };

        $(function() {



        })
      })
    },
    created(){
      getFoldList({
        moduleid:1,
        len:3
      }).then(res=>{
        if(res.body.code==1){
          this.catArr = res.body.data
        }

      })
    },
  methods: {
    changeFirstActiveIndex(idx1){
      this.activeFristIndex = idx1||0
    }
  }

}

</script>
<style lang='less' scoped>

  #mallCategoryBody{
    background: white;

    #rootList{
      overflow-x: hidden;
      position: fixed;
      left: 0;
      top: 40px;
      bottom: 0;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      z-index: 22;
      width: 86px;
      background: #F8F8F8;
      #rootListBox{

        ul{
          width: 85px;
          li{
            height: 46px;
            line-height: 46px;
            text-align: center;
            &.cur{
              a{
                color:#E93B3D;
              }
            }
          }
        }
      }

    }
    .category-content{
      height: 100%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      width: 100%;
      font-size: 12px;
      color: #252525;
      #branchScroll{
        overflow: hidden;
        margin-left: 86px;
        #branchList{
          /*overflow-y: scroll;*/
          /*-webkit-overflow-scrolling: touch;*/
        }
        .jd-category-div{
          margin: 19px 7px 0 7px;
          h4{

          }
          ul.jd-category-style-1{
            border: 0;
            font-size: 0;
            padding: 7px 10px 0px 10px;
            overflow: hidden;
            li{
              width: 32.8%;
              float: left;
              text-align: center;

              a{
                text-decoration: none;
                color: #252525;
                img{
                  width: 70px;
                  height: 70px;
                }
                span{
                  font-size: 12px;
                  height: 36px;
                  color: #686868;
                  width: 100%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: block;
                  line-clamp: 2;
                  box-orient: vertical;
                  word-break: break-all;
                  box-align: center;
                  box-pack: center;
                  z-index: 2;
                  position: relative;
                  color: #333;
                  height: 35px;
                  margin-top: 2px;
                }
              }
            }
          }
        }
      }
    }
  }

</style>


