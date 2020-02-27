<template>
  <div class="admin">
    <div class="box">
      <h2>招聘系统后台管理</h2>
        <div class="inputbox">
            <input type="text" name="" required="" v-model="userName">
            <label>Username</label>
        </div>
        <div class="inputbox">
            <input type="password" name=" " required="" v-model="userPwd">
            <label>Password</label>
        </div>
        <button @click="login" class="login">登录</button>
    </div>
  </div>
</template>
<script>
export default {
  created() {
  },
  data() {
    return {
      userName: '',
      userPwd: ''
    }
  },
  methods: {
    login() {
      this.$axios({
        method: 'post',
        url: '/api/resume/login',
        data: {
          userName: this.userName,
          userPwd: this.userPwd
        }
      }).then(res => {
        const { success, sessionData } = res.data
        if(success) {
         this.$router.push('/selectAdmin')
          this.$notify.success({
            title: '登录成功',
          });
        } else {
          this.$notify.error({
            title: '登录错误',
            message: '用户名或密码错误'
          });
        }
        sessionStorage.setItem('sessionData',sessionData)
      })
    }
  },

}


</script>
<style scoped>
.admin {
  width: 100vw;
  height: 100vh;
  background-color: rgba(64, 158, 255, .9);
}
.box{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    /*实现块元素百分比下居中*/
    width:450px;
    padding:50px;
    background: rgba(0,0,0,.8);
    box-sizing:border-box;
    box-shadow: 0px 15px 25px rgba(0,0,0,.5);
    border-radius:15px;
    text-align: center;
}
.box h2{
    margin:0 0 30px;
    padding:0;
    color: #fff;
    text-align:center;
}
.box .inputbox{
    position:relative;
}
.box .inputbox input{
    width: 100%;
    padding:10px 0;
    font-size:16px;
    color:#fff;
    letter-spacing: 1px;
    margin-bottom: 30px;
    border:none;
    border-bottom: 1px solid #fff;
    outline:none;
    background: transparent;
}
.box .inputbox label{
    position:absolute;
    top:0px;
    left:0px;
    padding:10px 0;
    font-size: 16px;
    color:#fff;
    pointer-events:none;
    transition:.5s;
}
.box .inputbox input:focus ~ label,
.box .inputbox input:valid ~ label
{
    top:-18px;
    left:0;
    color:#03a9f4;
    font-size:14px;
}
.login
{
    background: transparent;
    border:none;
    outline:none;
    font-size: 16px;
    color:#fff;
    background: #03a9f4;
    padding:15px 20px;
    cursor: pointer;
    border-radius:10px; 
    width: 100%;
    text-align: center;
}
</style>
