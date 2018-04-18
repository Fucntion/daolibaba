<template>
  <div   class="attrbox padding10-r">
      <div class="head padding10-c">
      </div>
      <div  class="attrs padding10">
          <div class="info-line" v-for="(attr,idx1) in mall.attr" :key="idx1">
              <div class="label font14">{{attr.title}}</div>
              <div class="btns">{{attr.val}}</div>
          </div>
      </div>
      
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
   
  },
  props: ["mall"],
  components: {},

  computed: {},

  methods: {

      closeAttrBox:function(){
        
        this.$emit('close');
      },
      
  }
};
</script>
<style lang='less' scoped>
@import "../../../assets/style/base.less";

.attrbox {
  background: white;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  bottom: 0;
  z-index: 100;
  height: 70%;
  overflow-y: scroll;

  
.attrs{

  .info-line {
    display: flex;

    .label {
      width: 70px;
      margin-right: 10ox;
      margin-bottom: 4px;
      line-height: 30px;
      color: @grayFontColor;
      text-align: left;

    }
    .btns {
      flex: 1;
      line-height: 30px;
      .select {
        height: 24px;
        margin-left: 6px;
        border: 1px solid #999999;
        &.selected {
            border-color: @activeColor;
            color: @activeColor;
        }
      }
    }
  }
}

}
</style>