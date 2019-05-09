<template>
  <div class="education-warper warp-direction">
    <div class="title mb20 bg-white">学时统计</div>
    <!-- 统计栏 -->
    <mu-container>
      <mu-row gutter class="grid-warp">
        <mu-col span="4" v-for="(item, index) in list" :key="index" class="p10">
          <div class="grid-cell">
            <div class="grid-cell__title pt10 pb10">{{item.title}}</div>
            <div class="grid-cell__count pb10">{{item.total}}</div>
          </div>
        </mu-col>
      </mu-row>
    </mu-container>
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
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as view from '@/const/type/view';

type ITab = Omit<view.IMenu, 'icon'>;
@Component
export default class Hour extends Vue {
  private active: string = 'all';
  private list: any[] = [{
      title: '已用',
      total: '0',
    }, {
      title: '总计',
      total: '12',
    }, {
      title: '剩余',
      total: '12',
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

 .title {
   font-size: 15px;
   text-align: center;
  padding: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: $box-shadow;
 }
 .grid-cell {
   width: 100%;
   text-align: center;
   box-shadow: $box-shadow; 
   border-radius: 10px;
   &__title {
     font-size: 12px;
     color: #333;
     
   }
   &__count {
     font-size: 24px;
    //  font-weight: bold;
   }
 }

 </style>
 