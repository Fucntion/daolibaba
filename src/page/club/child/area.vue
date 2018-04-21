<!--  -->
<template>
<div v-if="areas.length>0">
  <div>
    <mt-cell v-for="(city,idx) in areas" :title="city.name"  is-link :to="'/club?city_id='+city.id"></mt-cell>
  </div>
</div>
</template>

<script>
  import {mapState,mapActions} from 'vuex';
export default {
  data() {
    return {

    };
  },
  components: {},

  computed: {
    ...mapState(["areas"])
  },
  created(){
    this.getCityList()
  },
  methods: {
    ...mapActions(["getCityList"]),
  }
};
</script>
<style lang='less' scoped>

</style>
