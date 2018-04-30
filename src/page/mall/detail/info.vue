<template>
  <div>
    <div id="infobox"  v-html="content"></div>
  </div>
</template>
<script>
import { mall } from "../../../service/getData";
export default {
  data() {
    return {
        content:null
    }

  },
  components: {},

  created(){
    this.getInfo()
  },
  computed: {},

  methods: {

      closeAttrBox:function(){

        this.$emit('close');
      },
      getInfo() {
      let mise = mall({
        id: this.$route.params.id,easy:1,with:'content'
      });

      mise.then(res => {
        let body = res.body;
        if (body.code === 1) {
          this.content = res.body.data.content.content;
        }
      });
    }

  }
};
</script>
<style lang='less'>
@import "../../../assets/style/base.less";
#infobox{
  width: 100%;
  overflow-x: hidden;
  img{
    width: 100%;
  }

}



</style>
