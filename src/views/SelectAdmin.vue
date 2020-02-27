<template>
  <div class="select-admin">
    <el-button type="success" @click="gotoAdminInf">进入招聘信息管理发布后台</el-button>
    <el-button type="success" @click="gotoAdminResume">进入简历管理后台</el-button>
  </div>
</template>

<script>

export default {
  created() {
    if(sessionStorage.getItem('sessionData') !== 'jkjasdkfjksadf') {
      this.$notify({
        title: '错误',
        message: '请登录',
        duration: 0
      });
      this.$router.replace('/admin')
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    gotoAdminInf() {
      this.$router.push('/adminInf')
    },
    gotoAdminResume() {
      this.$router.push('/adminResume')
    }
  },

}


</script>
<style scoped>
.select-admin{
  width: 100vw;
  height: 100vh;
  background-color: rgba(64, 158, 255, .9);
  padding-top: 200px;
}
.select-admin button {
  width: 600px;
  display: block;
  height: 60px;
  margin: 0 auto;
  font-size: 22px;
  /* margin-top: 200px; */
}
.select-admin button:nth-child(2) {
  margin-top: 200px;
}
</style>
