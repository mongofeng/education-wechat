<template>
  <div id="app">
    <!-- 使用动态的 transition name -->
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import * as api from '@/api/wechat';
import {
  namespace,
} from 'vuex-class';
import TransitionRoute from '@/mixins/transtion';

const someModule = namespace('oauth');

@Component
export default class App extends Mixins(TransitionRoute) {
  @someModule.Getter('openid') public openid!: string;
  @someModule.State('userid') public userid!: string;
  @someModule.Action('fetchOpenId') public fetchOpenId!: () => Promise<void>;
  @someModule.Action('fetchUserId') public fetchUserId!: () => Promise<void>;

  public mounted() {
    console.log('app mounted');
    this.init();
  }
  private async init() {
    if (this.openid) {
      await this.fetchUserId();
    } else {
      await this.fetchOpenId();
      await this.fetchUserId();
    }

    if (!this.userid) {
      this.$router.replace({
        name: 'register',
      });
    }
  }
}
</script>
