<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as api from "@/api/wechat";

@Component
export default class App extends Vue {
  public mounted() {
    console.log("app mounted");
    this.getOpenId();
  }
  private async getOpenId() {
    // http://47.107.144.222/wechat/?code=011R4Wmd2cN10F0QNYkd2YVPmd2R4Wma&state=STATE#/hour/all
    // localhost:8080?code=011R4Wmd2cN10F0QNYkd2YVPmd2R4Wma&state=STATE#/hour/all
    console.log(location.search);
    const openid: string | null = localStorage.getItem("openid");

    // 如果本地有openid就已经授权了不用再授权
    if (openid) {
      return;
    }
    
    if (!/code=([^&]+)/.test(location.search) || !RegExp.$1) {
      return;
    }
    const code = RegExp.$1;
    console.log(RegExp.$1);
    const { data } = await api.fetchOpenId({
      code
    });
    // {
    //   access_token: "21_PfvmJCQ0lfGVhF2_rT-Cc44OOZ2snNM52iDKBOwl0CRAsc4BlqwiTQmuEwg5fa1UrJLe4G3Adny27h1kcGbPag",
    //   expires_in: 7200,
    //   refresh_token: "21_paF-7xYUSMPWbLpZG7bYod9w9LKRUUuvXmE8axVF5uJ-I-RGr5N3dqpqidAy4cw58MA0HaG1mQmsQr1_pp8q7Q",
    //   openid: "oVB5OwyVDKfTZq4T61_p2roSg1tA",
    //   scope: "snsapi_base"}
    console.log(data);
    localStorage.setItem("openid", data.openid);
  }
}
</script>
