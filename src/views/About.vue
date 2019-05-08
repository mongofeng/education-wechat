<template>
  <div class="about">
    <h2 class="education-block__title">
      请绑定手机号
    </h2>
    <van-cell-group>
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
    </van-cell-group>
    <van-button type="primary" size="large" class="mt20">绑定手机</van-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class About extends Vue {
  private phone: string = '';
}
</script>
<style lang="scss" scoped>
// @import '~@/assets/scss/utils.scss';
.about {
  // margin: 0 auto;
  // width: 90%;
  padding: 0 20px;
  background-color: #f2f3f5;
}

</style>

