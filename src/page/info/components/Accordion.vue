<!-- 折叠列表 组件 -->
<template>
  <nav class="accWrapper">
    <div class="accTitle" @click="toggleList" v-if="title.child.length>0">
      <span>{{ title.title}}</span>
      <!--<i class="iconfont icon-previewright"-->
         <!--:class="['accChevron', { 'open_menu': isDisplay, 'close_menu': !isDisplay }]" ></i>-->
    </div>
    <ul :class="['accList', { 'maxHeight': isDisplay }]">
      <li class="accListItem" v-for="item in list">
        <router-link :to="'/info/post?catid='+item.id"><span>{{ item.title}}</span></router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    data () {
      return {
        isDisplay: false
      }
    },
    props: {
      title: {
        type: Object,
        default(){
          return {}
        }
      },
      list: {
        type: Array,
        required: true
      }
    },
    methods: {
      toggleList () {
        this.isDisplay = !this.isDisplay
      }
    }
  }
</script>

<style lang="less" scoped>
  .accWrapper {
    display:flex;
    flex-direction: column;
  }
  .accTitle {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    background: #e8e8e8;
    text-indent: 1em;
    cursor: pointer;
  }
  .accChevron {
    /*width: 20px;*/
    margin-right: 15px;
  }
  .accList{
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 16px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s ease-out;
  }
  .accList.maxHeight {
    max-height: 500px;
    transition: max-height .5s ease-in;
  }
  .accListItem {
    /*background-image: url(../assets/img/arrow_right.png);*/
    background-repeat: no-repeat;
    background-size: 20px 20px;
    background-position: 95% 50%;
    display: flex;
    // justify-content: space-between;
    align-items: baseline;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    text-indent: 1em;
    cursor: pointer;
  }
  /* chevron animation  */
  @keyframes open-menu {
    to {
      transform: rotate(90deg);
    }
  }
  @keyframes close-menu {
    from {
      transform: rotate(90deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  .open_menu {
    animation: open-menu 0.4s ease-out forwards;
  }
  .close_menu {
    animation: close-menu 0.4s ease-out forwards;
  }
</style>
