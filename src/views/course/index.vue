<template>
  <div class="education-warper bg">
    <cube-scroll-nav
      :side="true"
      :data="data"
      :current="current"
      @change="changeHandler"
      @sticky-change="stickyChangeHandler">
      <cube-scroll-nav-panel
        v-for="item in data"
        :key="item.name"
        :label="item.name"
        :title="item.name">
        <ul>
          <li v-for="food in item.foods" :key="food.name">
            <div>
              <img :src="food.icon">
              <p>{{food.name}}</p>
            </div>
          </li>
        </ul>
      </cube-scroll-nav-panel>
    </cube-scroll-nav>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import goodsData from '@/data/good.json';
const goods = goodsData.goods;
@Component
export default class Course extends Vue {
  private loading: boolean = false;

  private data: any[] = goods;
  private current: string = goods[3].name;

  private changeHandler(label: string) {
    console.log('changed to:', label);
  }
  private stickyChangeHandler(current: any) {
    console.log('sticky-change', current);
  }
}
</script>
<style lang="stylus">
.prepend-header
  width: 90%
  margin: 20px auto
  text-align: center
  font-size: 20px
  line-height: 1.6
  border-radius: 2px
  box-shadow: 0 0 4px rgba(0, 0, 0, .2)
.cube-scroll-nav-main
  background-color: #efeff4
.cube-sticky-fixed
  background-color: #efeff4
.cube-scroll-nav-bar
  width: 120px
  background-color: transparent
.cube-scroll-nav-bar-item
  padding: 15px
.cube-scroll-nav-bar-item_active
  background-color: #fff
.cube-scroll-nav-panels
  background-color: #fff
.cube-scroll-nav-panel
  img
    width: 114px
    height: 114px
  ul
    overflow: hidden
    font-size: 14px
    line-height: 1.4
    color: #666
  li
    float: left
    width: 50%
    div
      width: 114px
      margin: auto
      p
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
.cube-scroll-nav-panel-title
  padding: 15px
  font-size: 16px
  background-color: #fff
</style>