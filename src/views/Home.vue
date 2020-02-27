<template>
  <div>
    <van-search v-model="value" placeholder="搜索职位关键词" shape="round" @search="onSearch" @cancel="onCancel"
/>
  <van-cell-group>
    <van-cell center v-for="(item, index) in itemLists" :key="index" :title="item.name" :label="item.desc" is-link @click="gotoResumeSubmit(item)"/>
  </van-cell-group>
  </div>
</template>

<script>
import Vue from 'vue';
import { Search } from 'vant';
import { Cell, CellGroup } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Search);
export default {
  name: 'Home',
  created() {
    this.$axios.get('/api/resume/getAllInf').then(res => {
      const { inf } = res.data
      this.itemLists = inf
      this.tempItemLists = inf
    })
  },
  data() {
    return {
      itemLists: [],
      tempItemLists: [],
      value: ''
    }
  },
  methods: {
    gotoResumeSubmit(item) {
      const { _id, name, desc }  = item
      this.$router.push({
        path: `/resumeSubmit`,
        query: {
          _id,
          name,
          desc
        }
      })
    },
    onSearch(val) {
      this.itemLists = []
      for(let i = 0; i < this.tempItemLists.length; i++) {
        if(this.tempItemLists[i].name.indexOf(val) !== -1 || this.tempItemLists[i].desc.indexOf(val) !== -1) {
          this.itemLists.push(this.tempItemLists[i])
        }
      }
    },
    onCancel() {
      this.itemLists = this.tempItemLists
    }
  },
  components: {

  }
}


</script>
