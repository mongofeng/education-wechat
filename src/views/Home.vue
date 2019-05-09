<template>
  <div class="home">
    <router-view/>
    <div class="nav">
      <mu-bottom-nav :value.sync="active">
        <mu-bottom-nav-item 
          v-for="item in menu" 
          :title="item.title" 
          :icon="item.icon" 
          :to="item.path" 
          :replace="true"
          :key="item.path" 
          :value="item.path">
        </mu-bottom-nav-item>
    </mu-bottom-nav>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
interface IMenu {
    title: string;
    icon: string;
    path: string;
  }
@Component
export default class Home extends Vue {
  private active: string = 'personal';

  private menu: IMenu[] = [
    {
      title: '个人中心',
      path: 'personal',
      icon: 'restore',
    },
    {
      title: '课程表',
      path: 'course',
      icon: 'favorite',
    },
    {
      title: '课时统计',
      path: 'hour',
      icon: 'location_on',
    },
  ];

  @Watch('$route.name', {immediate: true})
  public onChanged(val: string) {
    if (val === this.active) { return; }
    this.active = val;
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 56px;
  overflow: hidden;
}
.nav {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 2;
  box-shadow: $box-shadow;
}
</style>

