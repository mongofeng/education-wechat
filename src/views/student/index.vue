<template>
  <div class="education-warper bg">
    <div class="education-warper-container">

      <!-- 统计栏 -->
      <mu-container class="mb20 bg-white" >
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

        <mu-list-item button :ripple="false" to="/student-package" key="student-package">
          <mu-list-item-action>
            <mu-icon value="mail"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>课程包明细</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import * as type from '@/const/type/student';
import * as enums from '@/const/enum';
import * as view from '@/const/type/view';
import * as api from '@/api/student-package';
import * as apiWechat from '@/api/wechat';

type ITab = Pick<view.IMenu, 'icon' | 'title'>;

const someModule = namespace('oauth');
@Component
export default class Personal extends Vue {
  @someModule.State('userMsg') public userMsg!: type.IStudent;
  @someModule.State('userid') public userid!: string;
  @someModule.Getter('openid') public openid!: string;

  private SEX_LABEL: any = enums.SEX_LABEL;

  private totalInfo = {
    count: 0,
    surplus: 0,
    used: 0,
    overdueCount: 0,
    activiteCount: 0,
    unActiviteCount: 0,
  };

  get totalList() {
    return [
    {
      title: '已用课时',
      total: this.totalInfo.used,
    },
    {
      title: '总计课时',
      total: this.totalInfo.count,
    },
    {
      title: '剩余课时',
      total: this.totalInfo.surplus,
    },
  ];
  }

  get options(): ITab[] {
    const address = this.userMsg
      ? `${this.userMsg.province}${this.userMsg.city}${this.userMsg.region}`
      : ``;
    const phone = this.userMsg ? this.userMsg.phone : '';
    const status = this.userMsg
      ? enums.STUDENT_STATUS_LABEL[this.userMsg.status]
      : '';
    const name = this.userMsg ? this.userMsg.name : '';

    const sex = this.userMsg ? this.SEX_LABEL[this.userMsg.sex] : '';
    return [
      {
        icon: 'account_box',
        title: name,
      },
      {
        icon: 'album',
        title: sex,
      },
      {
        icon: 'account_balance',
        title: status,
      },
      {
        icon: 'call',
        title: phone,
      },
      {
        icon: 'room',
        title: address,
      },
    ];
  }

  @Watch('userid', {immediate: true})
  public onUserIdChange(val: string) {
    if (!val) { return; }
    this.fetchTotalHours();
  }

  @Watch('openid', {immediate: true})
  public onopenidChange(val: string) {
    if (!val) { return; }
  }




  public async fetchTotalHours() {
    const params = {
      studentIds: this.userid,
    };

    const { data: { data } } = await api.caculatePackage(params as any);
    const [target] = data;
    if (!target) {
      return;
    }
    const {
      count,
      used,
      surplus,
      overdueCount,
      activiteCount,
      unActiviteCount,
    } = target;

    this.totalInfo = {
      count,
      used,
      surplus,
      overdueCount,
      activiteCount,
      unActiviteCount,
    };
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

