<template>
<div>
  <head-box head-title="精品商家" go-back="true"></head-box>
  <div class="top-company-list padding15-r">
    <companyBox class="padding10-c" :company="company" v-for="company in topCompny" :key="company.id"></companyBox>

</div>
</div>
</template>

<script>
  import headBox from '../../components/head';
  import {company} from "../../service/getData";
  import companyBox from '../mall/common/company';
  export default {
        name: "top",
      data(){
          return {
            topCompny:null
          }
      },
    components:{
      companyBox,headBox
    },
      created(){
        this.getComany()
      },
      methods:{
        getComany(){
          //获取十个参数
          let mise = company({
            areaid:this.$root.utils.defaultCityId,
            size:10,
            field:'user_id,company,thumb,business',
            order:'hits desc',//先按照点击吧，后面就可以安排排名了
            mallSize:5,//返回五个商品
            is_club:1,//同城购
          });
          mise.then(res => {
            let body = res.body;
            if (body.code === 1) {
              this.topCompny = res.body.data;
            }
          });
        }
      }
    }
</script>

<style scoped>
.top-company-list{

}
</style>
