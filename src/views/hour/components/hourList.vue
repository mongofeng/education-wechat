<template>
  <mu-container ref="container" class="warp-direction__scroller">
    <mu-load-more :loading="loading" @load="load">
      <mu-list>
        <template v-for="i in num">
          <mu-list-item :key="i">
            <mu-list-item-title>{{text}} Item {{i}}</mu-list-item-title>
          </mu-list-item>
          <mu-divider :key="i + 'key'" />
        </template>
      </mu-list>
    </mu-load-more>
  </mu-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const num: number[] = [];
for (let i = 1; i < 10; i++) {
  num.push(i);
}

@Component
export default class HourList extends Vue {
  public active: number = 0;
  private num: number[] = num;
  private loading: boolean = false;


  get text(): string {
    return this.$route.name || 'text';
  }

  private load(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.num.push(this.num.length + 1);
    }, 2000);
  }
 }
</script>
<style lang="scss" scoped>
</style>