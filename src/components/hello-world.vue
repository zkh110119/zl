<template>
  <div>
    <el-button type="primary" icon="el-icon-share" @click="toTablePage" circle></el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    toTablePage() {
      this.$router.push({path:'/table'})
    }
  }
}
</script>

<style scoped>
</style>
