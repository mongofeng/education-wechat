<template>
  <mu-container class="education-warper warp">
    <!-- 统计栏 -->
    <mu-grid-list :cols="3" :cell-height="70">
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

    <!-- tab栏 -->
    <mu-tabs 
      :value.sync="active" 
      inverse 
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

    <router-view/>
  </mu-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
interface ITab {
    title: string;
    path: {
      name: string,
    };
    name: string;
  }
@Component
export default class Hour extends Vue {
  private active: string = 'all';
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

  private menu: ITab[] = [
    {
      title: '全部',
      name: 'all',
      path: {
        name: 'all',
      },
    },
    {
      title: '增加',
      name: 'increase',
      path: {
        name: 'increase',
      },
    },
    {
      title: '减少',
      name: 'decrease',
      path: {
        name: 'decrease',
      },
    },
  ];
}
</script>
 <style lang="scss" scoped>
 .warp {
   display: flex;
  flex-direction: column;
 }
 </style>
 