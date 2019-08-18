<template>
  <div class="home">
    <!-- 使用动态的 transition name -->
    <transition :name="transitionName" mode="out-in">
      <router-view></router-view>
    </transition>
    <div class="nav">
      <mu-bottom-nav :value.sync="active">
        <mu-bottom-nav-item 
          v-for="item in menu" 
          :title="item.title" 
          :icon="item.icon" 
          :to="item.path" 
          :replace="true"
          :key="item.name" 
          :value="item.name">
        </mu-bottom-nav-item>
    </mu-bottom-nav>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Mixins } from 'vue-property-decorator';
import * as view from '@/const/type/view';
import TransitionRoute from '@/mixins/transtion';

@Component
export default class Home extends Mixins(TransitionRoute) {
  private active: string = 'personal';

  private menu: view.IMenu[] = [
    {
      title: '课程表',
      name: 'course',
      icon: 'favorite',
      path: {
        name: 'course',
      },
    },
    {
      title: '课时统计',
      name: 'hour',
      icon: 'location_on',
      path: {
        name: 'hour',
      },
    },
    {
      title: '学员中心',
      name: 'student',
      icon: 'restore',
      path: {
        name: 'student',
      },
    },
    {
      title: '个人中心',
      name: 'personal',
      icon: 'restore',
      path: {
        name: 'personal',
      },
    },
  ];

  @Watch('$route.path', {immediate: true})
  public onChanged(val: string) {
    const arr = val.split('/');
    if (!arr.length || !arr[1]) { return; }
    if (arr[1] === this.active) { return; }

    this.active = arr[1];
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

