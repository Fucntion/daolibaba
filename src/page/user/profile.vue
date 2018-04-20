<!--  -->
<template>
  <div>
      <head-box :goBack="true" head-title="个人信息"></head-box>
      <mt-cell title="标题文字"></mt-cell>
<mt-cell title="标题文字" value="说明文字"></mt-cell>
<mt-cell title="标题文字" icon="more" value="带 icon"></mt-cell>
      <mt-cell title="标题" label="描述信息" is-link></mt-cell>
      <mt-cell title="标题" label="描述信息" is-link></mt-cell>
      <mt-cell title="标题" label="描述信息" is-link></mt-cell>
      <mt-cell title="标题" label="描述信息" is-link></mt-cell>
      <mt-cell title="标题" label="描述信息" is-link></mt-cell>
      <mt-cell title="标题" label="描述信息" is-link></mt-cell>
      <mt-cell title="标题" label="描述信息" is-link></mt-cell>

      <div @click="logout()" class="logout">
        <mt-button size="large" type="primary">退出登录</mt-button>
      </div>
  </div>
</template>

<script>
import headBox from "@/components/head";
export default {
  data () {
    return {
    };
  },

  components: {headBox},

  computed: {},

  methods: {
    logout(){
      localStorage.clear();
      sessionStorage.clear();
      this.$router.push({
        path:'/'
      })
    }
  }
}

</script>
<style lang='less' scoped>
.logout{

  width: 80%;
  margin: 40px auto;
  text-align: center;

}
</style>
