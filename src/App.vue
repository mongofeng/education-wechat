<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as api from '@/api/wechat'

@Component
export default class App extends Vue {
  private async getOpenId () {
    const {code} = this.$route.query
    if (!code) return
    const {data: {data}} = await api.fetchOpenId({
      code: code as string
    })
    console.log(data)
  }
  
  public mounted() {
    console.log('app mounted');
    this.getOpenId()
  }
}
</script>
