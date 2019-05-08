<template>
  <div class="home">
    <router-view/>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="personal">home</van-tabbar-item>
      <van-tabbar-item icon="search" dot to="course">course</van-tabbar-item>
      <!-- <van-tabbar-item icon="friends-o" info="5">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o" info="20">标签</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  private active: number = 0;
}
</script>
