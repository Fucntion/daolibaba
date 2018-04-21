<template>
  <div>
    <header class="head" v-if="company">
      <img class="logo" src="@/assets/img/demo/demo_store_top.jpg"/>
      <div class="title">
        <h4>{{company.company}}</h4>
        <div class="validate font12">
          <span><i class="iconfont icon-renzhengguanli" :class="{'active':company.validated}"></i>企业认证</span>
          <span><i class="iconfont icon-renzhengguanli" :class="{'active':company.is_club}"></i>同城导购</span>
        </div>
      </div>
    </header>
商家主题页
  </div>
</template>

<script>
  import {company} from "../../service/getData";
  export default {
    name: "show",
    data() {
      return {
        company: null
      }
    },
    created() {
      company({
        id: this.$router.meta.id,
        mallsize: 20
      }).then(res => {
        if (res.body.code == 1) {
          this.company = res.body.data
        }
      })
    }
  }
</script>

<style scoped>

</style>
