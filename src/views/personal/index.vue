<template>
  <div class="education-warper bg">
    <mu-card-header
      :title="userMsg ? userMsg.name : ''"
      :subTitle="userMsg ? SEX_LABEL[userMsg.sex] : ''"
      class="bg-white mb20"
    >
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
      <mu-list-item button :ripple="false" v-for="item in options" :key="item.icon">
        <mu-list-item-action>
          <mu-icon :value="item.icon"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>{{item.title}}</mu-list-item-title>
      </mu-list-item>
    </mu-list>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import * as type from '@/const/type/student';
import * as enums from '@/const/enum';
import * as view from '@/const/type/view';
import * as api from '@/api/student-hour';

type ITab = Pick<view.IMenu, 'icon' | 'title'>;

const someModule = namespace('oauth');
@Component
export default class Personal extends Vue {
  @someModule.State('userMsg') public userMsg!: type.IStudent;
  @someModule.State('userid') public userid!: string;

  private SEX_LABEL: any = enums.SEX_LABEL;

  private totalInfo = {
    total: 0,
    used: 0,
    reset: 0,
  };

  get totalList() {
    return [
    {
      title: '已用课时',
      total: this.totalInfo.used,
    },
    {
      title: '总计课时',
      total: this.totalInfo.total,
    },
    {
      title: '剩余课时',
      total: this.totalInfo.reset,
    },
  ];
  }

  get options(): ITab[] {
    const address = this.userMsg
      ? `${this.userMsg.province}${this.userMsg.city}${this.userMsg.region}`
      : ``;
    const age = this.userMsg ? `${this.userMsg.age}岁` : '';
    const phone = this.userMsg ? this.userMsg.phone : '';
    const status = this.userMsg
      ? enums.STUDENT_STATUS_LABEL[this.userMsg.status]
      : '';
    return [
      {
        icon: 'send',
        title: age,
      },
      {
        icon: 'drafts',
        title: status || '',
      },
      {
        icon: 'inbox',
        title: phone,
      },
      {
        icon: 'grade',
        title: address,
      },
    ];
  }

  @Watch('userid', {immediate: true})
  public onUserIdChange(val: string) {
    if (!val) { return; }
    this.fetchData();
  }


  public async fetchData()  {
    const {data: {data}} = await api.getStudentHour(this.userid);
    this.totalInfo.total = data.num;
    this.totalInfo.used = data.used;
    this.totalInfo.reset = data.num - data.used;
  }
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
  }
}
</style>

 