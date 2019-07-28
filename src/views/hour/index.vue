<template>
  <div class="education-warper warp-direction">
    <!-- <div class="title mb20 bg-white">学时统计</div> -->
    
    <!-- tab栏 -->
    <mu-tabs
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
import * as enums from '@/const/enum';
type ITab = Omit<view.IMenu, 'icon'>;
@Component
export default class Hour extends Mixins(TransitionRoute) {
  private active: string = String(enums.COURSE_HOUR_ACTION_TYPE.buy);

  private menu: ITab[] = Object.keys(enums.COURSE_HOUR_ACTION_TYPE_LABEL).reduce((initVal: any[], key) => {
    initVal.push({
      title: (enums.COURSE_HOUR_ACTION_TYPE_LABEL as any)[key],
      name: key,
      path: {
        name: 'hourType',
        params: {
          type: key,
        },
      },
    });

    return initVal;
  }, []);


  public async mounted() {
    this.$once('hook:beforeDestroy', () => {
      console.log('destory');
    });
  }
}
</script>

 