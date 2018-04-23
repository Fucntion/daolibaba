<template>
<div class="search-wrap">
    <div class="box padding15 block">
      <select class="type" v-model="type">
        <option value="mall">商品</option>
        <option value="company">公司</option>
        <option value="info">同城资讯</option>
        <option value="club">商圈</option>
      </select>
      <input placeholder="关键词" class="word" v-model="word" />
      <button @click="toSearch()" class="submit">搜索</button>
    </div>
</div>
</template>

<script>

    export default {
        name: "full",
      data(){
          return {
            type:'mall',
            word:''
          }
      },
      methods:{
        toSearch(){

          let type = this.type
          if(!type){
            this.$root.mint.alertMsg('type不可为空')
            return ;
          }
          let word = this.word
          if(!word){
            this.$root.mint.alertMsg('关键词不可为空')
            return ;
          }

          this.$router.push({
            path:'/r?type='+type+'&word='+word
          })

        }
      }
    }
</script>

<style lang='less' scoped>
.search-wrap{
  .box{
    .type,.word,.submit{
      display: block;

      width: 100%;
      box-sizing: border-box;
      height: 34px;
      border: 1px solid #e7e7e7;
    }
    .type{
      font-size: 14px;
      padding: 0 6px;
      margin-bottom: 20px;
    }
    .word{
      font-size: 14px;
      padding: 0 6px;
      margin-bottom: 20px;
    }
    .submit{
      height: 36px;
      border-radius: 4px;
      background: #26a2ff;
      color: white;
    }
  }
}
</style>
