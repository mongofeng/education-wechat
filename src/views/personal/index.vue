<template>
  <div class="education-warper bg">
    <mu-card-header title="Myron Avatar" sub-title="sub title" class="bg-white mb20">
      <mu-avatar slot="avatar">
        <img src="~@/assets/images/uicon.jpg">
      </mu-avatar>
    </mu-card-header>
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
}
</script>
<style lang="scss" scoped>

</style>

 