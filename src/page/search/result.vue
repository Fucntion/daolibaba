<template>
  <div>
    <head-box class="head block" :fixed="true" :plain="true" go-back="true" >
        <div slot='search' class="wordbox">
          <input class="word" v-model="word" />

        </div>
      <div slot="edit"><button>搜索</button></div>
    </head-box>

  </div>
</template>

<script>
  import headBox from '../../components/head';
  import rtClub from './result/club';
  import rtCompany from './result/company';
  import rtInfo from './result/info';
  import rtMall from './result/mall';
  
  export default {
    data () {
      return {
        type:'mall',
        word:''
      };
    },
    created(){

      if(this.$route.query.type){
        this.type = this.$route.query.type
      }
      if(this.$route.query.word){
        this.word = this.$route.query.word
      }
    },
    components: {headBox},

    computed: {},

    methods: {}
  }

</script>
<style lang='less' scoped>
.head{
  justify-content:flex-start;
  .wordbox{
    flex: 1;
    padding: 0 10px;
  }
  .word{
    width: 100%;
    height: 30px;
    margin-top: 7px;
    box-sizing: border-box;
    padding: 2px 4px;
    background: none;
    border:1px solid #c2c2c2;
    border-radius: 4px;
  }
  button{
    width: 60px;
    margin-top: 9px;
    height: 26px;
    font-size: 12px;
    border:1px solid #c2c2c2;
    border-radius: 4px;
  }
}
</style>
