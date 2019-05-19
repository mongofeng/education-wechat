<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as api from '@/api/wechat';

@Component
export default class App extends Vue {

  public mounted() {
    console.log('app mounted');
    this.getOpenId();
  }
  private async getOpenId() {
    // http://47.107.144.222/wechat/?code=011R4Wmd2cN10F0QNYkd2YVPmd2R4Wma&state=STATE#/hour/all
    // localhost:8080?code=011R4Wmd2cN10F0QNYkd2YVPmd2R4Wma&state=STATE#/hour/all
    console.log(location.search);
    if (!(/code=([^&]+)/.test(location.search)) || !RegExp.$1) { return; }
    const code = RegExp.$1;
    console.log(RegExp.$1);
    const {data: {data}} = await api.fetchOpenId({
      code,
    });
    console.log(data);
  }
}
</script>
