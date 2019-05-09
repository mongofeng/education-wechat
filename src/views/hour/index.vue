<template>
  <mu-container>
    <mu-grid-list :cols="3">
        <mu-sub-header>课时统计</mu-sub-header>
        <mu-grid-tile v-for="(item, index) in list" :key="index">
          <!-- <img :src="tile.image" > -->
          <span slot="title">{{item.title}}</span>
          <span slot="subTitle">by <b>{{item.author}}</b></span>
          <mu-button slot="action" icon>
            <mu-icon value="star_border"></mu-icon>
          </mu-button>
        </mu-grid-tile>
      </mu-grid-list>
  </mu-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Hour extends Vue {
  private list: any[] = [{
      title: '已用',
      author: '0',
    }, {
      title: '总计',
      author: '12',
    }, {
      title: '剩余',
      author: '12',
    }];
}
</script>
 