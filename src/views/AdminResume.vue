<template>
  <div>
    <div class="title">   
      <i class="el-icon-user-solid"></i>
      <span>简历管理后台</span>
    </div>
    <div class="place"></div>
  
    <div class="manage-inf">
      <el-table
          :data="resumes"
          stripe
          style="width: 100%">
          <el-table-column
            fixed
            prop="date"
            label="日期"
            width="100">
          </el-table-column>
          <el-table-column
            fixed
            prop="title"
            label="招聘标题"
            width="100">
          </el-table-column>
          <el-table-column
            fixed
            prop="name"
            label="应聘者姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            width="60">
          </el-table-column>
          <el-table-column
            prop="tel"
            label="电话"
            width="120">
          </el-table-column>
          <el-table-column
            prop="mail"
            label="邮箱"
            width="190">
          </el-table-column>
          <el-table-column
            prop="nativePlace"
            label="籍贯"
            width="170">
          </el-table-column>
          <el-table-column
            prop="address"
            label="现住址"
            width="170">
          </el-table-column>
          <el-table-column
            prop="applyForCity"
            label="应聘城市"
            width="150">
          </el-table-column>
          <el-table-column
            prop="salary"
            label="期望薪资"
            width="90">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button @click="deleteRow(scope.row)" type="text" size="medium">删除</el-button>
              <a class="a-download" :href="'http://' + scope.row.resumeUrl" v-if="scope.row.resumeUrl" target="_blank">下载简历</a>
              <a class="a-holder" v-else>下载简历</a>
            </template>
          </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
  export default {
    created() {
      this.$axios.get('/api/resume/getAllResume').then(res => {
        this.resumes = res.data.resumes
      })
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
        resumes: []
      };
    },
    methods: {
      getLocalTime(date) {        
        return date.toLocaleDateString().replace(/\//g, "-") + " " + date.toTimeString().substr(0, 8)
      },
      deleteRow(row) {
        this.$axios({
          method: 'post',
          url: '/api/resume/deleteResume',
          data: {
            _id: row._id
          }
        })
        for(let i = 0; i < this.resumes.length; i++) {
          if(this.resumes[i]._id == row._id) {
            this.resumes.splice(i, 1)
          }
        }
      },
    }
  }
</script>

<style scoped>
.title {
  font-size: 26px;
  font-weight: 900;
  height: 80px;
  line-height: 80px;
  width: 400px;
  left: 50%;
  margin-left: -80px;
  position: fixed;
}
.place{
  height: 80px;
}
.a-download{
  color: #409EFF;
  font-size: 14px;
}
.a-holder {
  color: #aaa
}
.admin-resume {
  width: 100vw;
  height: 100vh;
  background-color: rgba(64, 158, 255, .9); 
}
</style>