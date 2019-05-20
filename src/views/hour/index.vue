<template>
  <div class="education-warper warp-direction">
    <!-- <div class="title mb20 bg-white">学时统计</div> -->
    
    <!-- tab栏 -->
    <mu-tabs
      @hook:updated="pudate" 
      :value.sync="active" 
      inverse 
      full-width
      color="secondary" 
      text-color="rgba(0, 0, 0, .54)"  
      center>
      <mu-tab 
        v-for="item in menu" 
        :to="item.path" 
        :replace="true"
        :key="item.name" 
        :value="item.name">
        {{item.title}}
      </mu-tab>
    </mu-tabs>

    <transition :name="transitionName">
      <keep-alive>
        <router-view :key="$route.path"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import * as view from '@/const/type/view';
import TransitionRoute from '@/mixins/transtion';
type ITab = Omit<view.IMenu, 'icon'>;
@Component
export default class Hour extends Mixins(TransitionRoute) {
  private active: string = 'all';

  private menu: ITab[] = [
    {
      title: '总计课时',
      name: 'all',
      path: {
        name: 'all',
      },
    },
    {
      title: '增加课时',
      name: 'increase',
      path: {
        name: 'increase',
      },
    },
    {
      title: '已用课时',
      name: 'decrease',
      path: {
        name: 'decrease',
      },
    },
  ];


  public async mounted() {
    this.$once('hook:beforeDestroy', () => {
      console.log('destory');
    });
  }

  public pudate() {
    console.log(1111);
  }
}
</script>

 