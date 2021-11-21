<template>
  <div>
    <el-button type="primary" @click="toButtonPage" round>按钮</el-button>
    <el-button type="primary" @click="toTablePage" round>表格</el-button>
    <el-button type="primary" @click="toBlockPage" round>区块</el-button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  methods: {
    toButtonPage() {
      this.$router.push({
        name: "table",
        params: { type: "button" },
      });
    },
    toTablePage() {
      this.$router.push({
        name: "table",
        params: { type: "table" },
      });
    },
    toBlockPage() {
      this.$router.push({ path: "/block" });
    },
  },
};
</script>

<style scoped>
</style>
