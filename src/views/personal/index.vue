<template>
  <div class="education-warper bg">
    <mu-card-header title="Myron Avatar" sub-title="sub title" class="bg-white mb20">
      <mu-avatar slot="avatar">
        <img src="~@/assets/images/uicon.jpg">
      </mu-avatar>
    </mu-card-header>

    <!-- 统计栏 -->
    <mu-container class="mb20 bg-white">
      <mu-row gutter class="grid-warp">
        <mu-col span="4" v-for="(item, index) in totalList" :key="index" class="p10">
          <div class="grid-cell">
            <div class="grid-cell__count pb5">{{item.total}}</div>
            <div class="grid-cell__title pt5 pb5">{{item.title}}</div>
          </div>
        </mu-col>
      </mu-row>
    </mu-container>

    <mu-list class="bg-white">
      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="inbox"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>Inbox</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="grade"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>Stared</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="send"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>Sent mail</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="drafts"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>Drafts</mu-list-item-title>
      </mu-list-item>
    </mu-list>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Personal extends Vue {
  private list: any[] = [
    {
      title: 'Breakfast',
      author: 'Myron',
    },
    {
      title: 'Burger',
      author: 'Linyu',
    },
    {
      title: 'Camera',
      author: 'ruolin',
    },
  ];

  private totalList: any[] = [{
      title: '已用课时',
      total: '0',
    }, {
      title: '总计课时',
      total: '12',
    }, {
      title: '剩余课时',
      total: '12',
    }];
}
</script>
 <style lang="scss" scoped>
 .grid-cell {
   width: 100%;
   text-align: center;
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

 