<template>
  <div class="resume-submit">
    <van-nav-bar 
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    <h1>{{title}}</h1>

    <van-cell-group>
      <van-field required v-model="name" label="真实姓名" placeholder="请输入完整姓名"/>
      <van-field required v-model="tel" type="tel" label="手机号" placeholder="请输入11位手机号码"/>
      <van-cell title="性别">
        <van-radio-group slot="right-icon" v-model="radio" direction="horizontal">
          <van-radio name="1" icon-size="14px">男</van-radio>
          <van-radio name="2" icon-size="14px">女</van-radio>
        </van-radio-group>
      </van-cell>

      <van-field required v-model="age" type="digit" label="年龄" placeholder="请输入你的年龄"/>
      <van-field v-model="mail" label="常用邮箱" placeholder="请输入常用邮箱"/>

      <van-cell title="籍贯" is-link :value="nativePlace" @click="chooseBorn" value-class="right-choose"/>
      <van-area :area-list="areaList" v-if="showArea1" @confirm="confirmBorn" @cancel="cancelBorn"/>

      <van-cell title="现住地" is-link :value="address" @click="chooseAddress" value-class="right-choose"/>
      <van-area :area-list="areaList" v-if="showArea2" @confirm="confirmBorn" @cancel="cancelBorn"/>
      
      <van-cell title="应聘城市" is-link :value="applyForCity" @click="chooseCity" value-class="right-choose"/>
      <van-area :area-list="areaList" v-if="showArea3" columns-num="2" @confirm="confirmBorn" @cancel="cancelBorn"/>
      
      <van-field v-model="salary" type="digit" label="期望薪资" placeholder="请输入你的期望薪资(元)"/>
      <van-field v-model="remark" label="备注" placeholder="请输入备注(非必填)"/>
    </van-cell-group> 
    <div class="upload-resume">
      <!-- <van-uploader :after-read="afterRead" accept=".doc,.docx,.pdf"> -->
        <van-uploader :before-read="beforeRead" :after-read="afterRead" accept="">
        <van-button class="button" icon="" type="primary">{{buttonName}}</van-button>
      </van-uploader>
    </div>

    <div class="j-footer">
      <van-button class="bottom-button-submit" type="default" @click="reset">重置</van-button>      
      <van-button class="bottom-button-submit" type="info" @click="submit">提交</van-button>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import areaList from '../data/area.js';
import * as qiniu from 'qiniu-js'
import { NavBar } from 'vant';
import { Field } from 'vant';
import { Cell, CellGroup } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Area } from 'vant';
import { Uploader } from 'vant';
import { Button } from 'vant';
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(Button)
Vue.use(Uploader);
Vue.use(Area);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(NavBar);
export default {
  data() {
    return {
      radio: '1',
      title: '',
      desc: '',
      id: '',
      name: '',
      age: '',
      tel: '',
      male: '男',
      mail: '',
      salary: '',
      remark: '',
      resumeUrl: '',
      areaList,
      showArea1: false,
      showArea2: false,
      showArea3: false,
      chooseNum: 1,
      nativePlace: '请选择你的籍贯',
      address: '请选择你的现住地',
      applyForCity: '请选择你的应聘城市(必选)',
      buttonName: '上传简历(只允许Word/PDF格式，非必选)'
    }
  },
  created() {
    const { _id, name } = this.$route.query
    this.id = _id
    this.title = name
    // this.desc = desc
  },
  methods: {
    chooseBorn() {
      this.showArea1 = !this.showArea1
      this.chooseNum = 1
    },
    chooseAddress() {
      this.showArea2 = !this.showArea2
      this.chooseNum = 2
    },
    chooseCity() {
      this.showArea3 = !this.showArea3
      this.chooseNum = 3      
    },
    confirmBorn(area) {
      if(this.chooseNum === 1) {
        this.nativePlace = `${area[0].name}-${area[1].name}-${area[2].name}`
        this.showArea1 = false
      } else if(this.chooseNum === 2){
        this.address = `${area[0].name}-${area[1].name}-${area[2].name}`
        this.showArea2 = false
      } else {
        this.applyForCity = `${area[0].name}-${area[1].name}`
        this.showArea3 = false
      }
    },
    confirmAddress(area) {
      this.address = `${area[0].name}-${area[1].name}-${area[2].name}`
      this.showArea = false
    },
    cancelBorn() {
      this.showArea1 = false
      this.showArea2 = false
      this.showArea3 = false
    },
    uploadResume(file, token) {
      console.log(file)
      return new Promise((resolve) => {
        const observable = qiniu.upload(file, file.lastModified + file.name , token)
        var observer = {
          complete(res) {
            resolve(res)
          }
        }
        observable.subscribe(observer) // 上传开始
      })



      // let param = new FormData()
      // param.append('file', file)
      // param.append('token', token)
      // return this.$axios({
      //   method: 'post',
      //   url: 'http://upload.qiniup.com/',
      //   data: param
      // })
    },
    beforeRead(file) {
      if(file.type !== 'application/msword' 
      && file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      && file.type !== 'application/pdf') {
        Toast('请上传word或pdf格式的简历')
        return false
      } else if(file.size >= 10485760){
        Toast('文件大于10Mb')
        return false
      } else {
        return true
      }
    },
    afterRead(file) {
      Toast.loading({
        message: '简历上传中...',
        forbidClick: true,
        duration: 0
      });

      this.$axios.get("/api/resume/token").then(res => {
        return this.uploadResume(file.file, res.data.token)
      }).then((res) => {
        this.resumeUrl = `cdn.heron.fit/${res.key}`
        console.log('success---------------------->', this.resumeUrl)
        Toast.success('简历上传成功，请记得提交')
        this.buttonName = file.file.name
      }).catch(() => {
        Toast.fail('简历上传失败')
      })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    submit() {
      if(this.radio == 1) {
        this.male = '男'
      } else {
        this.male = '女'
      }
      if(this.nativePlace == '请选择你的籍贯') {
        this.nativePlace = ''
      }
      if(this.address == '请选择你的现住地') {
        this.address =''
      }
      if(this.applyForCity =='请选择你的应聘城市(必选)') {
        this.applyForCity = ''
      }
      if(!this.name) {
        Toast('请输入姓名')
      }else if(!this.tel) {
        Toast('请输入电话号码')
      }else if(this.tel.length !== 11) {
        Toast('电话号码长度应为11位')
      }else if(!this.age) {
        Toast('请输入年龄')
      }else if(!this.applyForCity) {
        Toast('请选择你的应聘城市')
      }else {
        const data = {
          infId: this.id,
          title: this.title,
          date: this.getLocalTime(new Date()),
          name: this.name,
          age: this.age,
          tel: this.tel,
          male: this.male,
          mail: this.mail,
          nativePlace: this.nativePlace,
          address: this.address,
          applyForCity: this.applyForCity,
          salary: this.salary,
          remark: this.remark,
          resumeUrl: this.resumeUrl
        }
        Toast.loading({
          message: '信息提交中...',
          forbidClick: true,
          duration: 0
        });
        this.$axios({
          method: 'post',
          url: '/api/resume/submitResume',
          data,
        }).then(() => {
          Toast.success('你的信息我们已收到')
          this.$router.go(-1)
        })
      }
    },
    reset() {
      this.radio = '1'
      this.name = ''
      this.age = ''
      this.tel = ''
      this.male = '男'
      this.mail = ''
      this.salary = ''
      this.remark = ''
      this.resumeUrl = ''
      this.showArea1 = false
      this.showArea2 = false
      this.showArea3 = false
      this.chooseNum = 1
      this.nativePlace = '请选择你的籍贯'
      this.address = '请选择你的现住地'
      this.applyForCity = '请选择你的应聘城市(必选)'
      this.buttonName = '上传简历(Word/PDF，非必选)'  
    },
    getLocalTime(date) {        
      return date.toLocaleDateString().replace(/\//g, "-") + " " + date.toTimeString().substr(0, 8)
    },
  }
}
</script>
<style scoped>
 .resume-submit{
   padding-top: 40px;
    padding-bottom: 74px;
    position: relative;
    height: 100vh;
    overflow: auto;
    box-sizing: border-box;
 }
  h1{
    font-size: 16px;
    font-weight: 700;
    margin-left: 20px;
  }
  .van-radio-group--horizontal{
    flex: 2.8;
  }
  .upload-resume {
    text-align: center
  }
  .right-choose{
    flex: 2.6;
    text-align: left;
  }
  .button{
    display: block;
    text-align: center;
    width: 300px;
    margin: 0 auto;
  }
  .j-footer {
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #e8e8e8;
    background-color: #fff;
    padding: 15px 20px;
  }
  .j-footer button{
    width: 100px;
    display: inline-block;
  }
  .j-footer button:nth-child(2){
    width: 150px;
    margin-left: 80px;
  }


</style>