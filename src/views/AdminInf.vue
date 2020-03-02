<template>
  <div class="admin-inf">
    <el-dialog title="编辑招聘信息" :visible.sync="dialogFormVisible">
      <div class="release-inf">
        <el-form 
          v-loading="loading"
          element-loading-text="提交中"
          element-loading-spinner="el-icon-loading"
          :model="ruleForm" 
          :rules="rules" 
          ref="ruleForm" 
          label-width="100px" 
          class="demo-ruleForm">
          <el-form-item label="招聘标题" prop="name">
            <el-input v-model="ruleForm.name" placeholder="输入招聘标题，如JAVA开发工程师等"></el-input>
          </el-form-item>

          <el-form-item label="其他信息" prop="desc">
            <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 10}" v-model="ruleForm.desc" 
            placeholder="岗位描述及岗位要求（注意换行和格式）如：
岗位描述：
1、负责抖音、抖音火山版、机器学习平台等大规模集群的SRE和运维优化工作；
2、负责核心服务的持续集成和交付，高效和自动化的运维优化，提升服务的稳定性和研发效率；
3、负责大规模集群的云平台化、资源优化、SLA保障。
岗位要求：
1.学历本科及以上
2.三年以上开发经验"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{confirmWords}}</el-button>
            <el-button @click="cancalForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <div class="title">   
      <i class="el-icon-mouse"></i>
      <span>招聘信息管理发布后台</span>
    </div>
    <div class="place"></div>
    <el-button class="new-button" type="success" @click="showDialog">创建招聘信息</el-button>
    <div class="manage-inf">
      <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="招聘标题"
            width="240">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="其他信息"
            width="570">
          </el-table-column>


          <el-table-column
            fixed="right"
            label="操作"
            width="">
            <template slot-scope="scope">
              <el-button @click="deleteRow(scope.row)" type="text" size="medium">删除</el-button>
              <el-button @click="edit(scope.row)" type="text" size="medium">编辑</el-button>
              <el-button @click="getCode(scope.row)" type="text" size="medium">获取投递二维码</el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
  export default {
    created() {
      this.$axios.get('/api/resume/getAllInf').then(res => {
        const { inf = [] }  = res.data
        this.tableData = inf
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
        dialogFormVisible: false,
        loading: false,
        confirmWords: "立即创建",
        editRow: '',
        ruleForm: {
          name: '',
          desc: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入招聘标题', trigger: 'blur' },
            { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写其他信息', trigger: 'blur' }
          ]
        },
        tableData: []
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            const data = {
              ...this.ruleForm,
              date: this.getLocalTime(new Date()),
            }
            if(!this.editRow) {
              this.$axios({
                method: 'post',
                url: '/api/resume/submitInf',
                data
              }).then((res) => {
                this.tableData.push({
                  ...data,
                  _id: res.data._id
                })
                this.editRow = ''
                this.dialogFormVisible = false
                this.loading = false
                this.ruleForm.name = ''
                this.ruleForm.desc = ''
                return 
              })
            /**
             * 如果是编辑就进入下面执行
             */
            } else {
              this.$axios({
                method: 'post',
                url: '/api/resume/updateInf',
                data: {
                  ...data,
                  _id: this.editRow
                }
              }).then(() => {
                this.tableData.forEach(content => {
                  if(content._id == this.editRow) {
                    content.name = data.name
                    content.desc = data.desc
                    content.date = data.date
                  }
                })
                this.editRow = ''
                this.dialogFormVisible = false
                this.loading = false
                this.ruleForm.name = ''
                this.ruleForm.desc = ''
              })
            }
          } else {
            console.log('error submit!!');
            alert('输入有误，请再次确认')
            return false;
          }
        });
      },
      showDialog() {
        this.dialogFormVisible= true
      },
      getLocalTime(date) {        
        return date.toLocaleDateString().replace(/\//g, "-") + " " + date.toTimeString().substr(0, 8)
      },
      cancalForm() {
        this.dialogFormVisible = false
      },
      deleteRow(row) {
        this.$axios({
          method: 'post',
          url: '/api/resume/deleteInf',
          data: {
            _id: row._id
          }
        })
        for(let i = 0; i < this.tableData.length; i++) {
          if(this.tableData[i]._id == row._id) {
            this.tableData.splice(i, 1)
          }
        }
      },
      edit(row) {
        this.dialogFormVisible = true
        this.ruleForm.name = row.name
        this.ruleForm.desc = row.desc
        this.confirmWords = "更新"
        this.editRow = row._id
      },
      getCode(row) {
        const { _id } = row
        const url = `https://cli.im/api/qrcode/code?text=http://www.heron.fit/%23/?id=${_id}&mhid=sULAX166n54hMHcnK9ZQOKo`
        window.open(url)
      }
    }
  }
</script>

<style>
.title {
  font-size: 26px;
  font-weight: 900;
  height: 80px;
  line-height: 80px;
  width: 400px;
  left: 50%;
  margin-left: -170px;
  position: fixed;
}
.place{
  height: 80px;
}
.manage-inf {
  margin-top: 180px;
  border: 1px solid #cdd7ea;
  margin: 0 auto;
}
.new-button {
  float: right;
}
</style>