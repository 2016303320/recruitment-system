<template>
  <div class="j-warp">
    <div class="j-header">
      <h1>{{name}}</h1>
    </div>
    <div class="j-content">
      <h2>岗位描述及要求</h2>
      <pre>{{content}}</pre>
    </div>
    <div class="j-footer">
      <van-button plain type="info" @click="showShare">分享岗位</van-button>
      <van-button @click="gotoResumeSubmit" type="info">立即投递</van-button>
    </div>
    <div class="u-share-mask" v-if="share" @click="cancelShare">
      <div class="share-content">
        <img src="../assets/share-position_2x.55626c20.png" alt="点击右上角按钮分享职位">
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import { Button } from 'vant';

Vue.use(Button);


export default {
  created() {
    const { id } = this.$route.query
    this.$axios({
      method: 'post',
      url: '/api/resume/getInfById',
      data: {
        _id: id
      }
    }).then(res => {
      this.content = res.data.inf.desc
      this.name = res.data.inf.name
    })
    
  },
  data() {
    return {
      content: '',
      name: '',
      share: false
    }
  },
  methods: {
    gotoResumeSubmit() {
      const { id } = this.$route.query
      const name = this.name
      this.$router.push({
        path: `/resumeSubmit`,
        query: {
          _id: id,
          name,
        }
      })
    },
    cancelShare() {
      this.share = false
    },
    showShare() {
      this.share = true
    }
  },
  components: {

  }
}

</script>

<style scoped>
.j-warp {
  padding-bottom: 74px;
  position: relative;
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
}
.j-header {
  padding-left: 18px;
  padding-bottom: 16px;
  border: 1px solid #e8e8e8;
}
.j-header h1{
  font-size: 22px;
  font-weight: 700;
}
.j-content{
  padding-left: 18px;
  padding-right: 18px;
}
.j-content h2 {
  border-left: 3px solid #3c8cff;
  font-size: 14px;
  padding-left: 10px;
  font-weight: 700;
  margin-bottom: 20px;
}
.j-content pre {
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.8;
  font-family: PingFangSC-Regular,sans-serif;
}
.j-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #e8e8e8;
  background-color: #fff;
  padding: 15px 20px;
}
.j-footer button:nth-child(2) {
  width: 200px;
  display: inline-block;
  margin-left: 40px;
}
.u-share-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.8);
}
.share-content img{
  width: 90%;
  margin: 5%;
}
</style>>


