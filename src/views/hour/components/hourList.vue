<template>
  <mu-container ref="container" class="warp-direction__scroller" >
    <mu-load-more :loading="loading" @load="loadList" v-if="list.length" >
      <mu-list>
        <template v-for="item in list">
          <mu-list-item :key="item._id" class="pt5 pb5" :to="{
            name: 'HourDetail',
            params: {
              id: item._id
            }
          }">
            <mu-list-item-action>
              <mu-icon value="star" :color="COURSE_HOUR_ACTION_TYPE_COLOR[item.type]"></mu-icon>
            </mu-list-item-action>

            <mu-list-item-content>
              <mu-list-item-title>{{COURSE_HOUR_TYPE_LABEL[item.type]}}</mu-list-item-title>
              <mu-list-item-sub-title>{{formatDate(new Date(item.createDate))}}</mu-list-item-sub-title>
            </mu-list-item-content>

            <mu-list-item-action >
              <mu-list-item-after-text>{{item.num}}课时</mu-list-item-after-text>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider :key="item._id + 'key'" />
        </template>
      </mu-list>
    </mu-load-more>

    <div class="no-data" v-if="!loading && !list.length"></div>
  </mu-container>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import * as api from '@/api/hour';
import * as type from '@/const/type/hour';
import * as enums from '@/const/enum';
import { namespace } from 'vuex-class';
import formatDate from '@/utils/format-date';

const someModule = namespace('oauth');
@Component
export default class HourList extends Vue {
  @someModule.State('userid') public userid!: string;

  @Prop()
  public type!: string | number;

  public formatDate = formatDate;
  public COURSE_HOUR_TYPE_LABEL: any = enums.COURSE_HOUR_ACTION_TYPE_LABEL;
  public COURSE_HOUR_ACTION_TYPE_COLOR: any = enums.COURSE_HOUR_ACTION_TYPE_COLOR;
  public page: number = 1;
  public count: number = 0;

  public list: type.IHour[] = [];

  public active: number = 0;
  private loading: boolean = false;


  get condition() {
    const condition: any = {
      limit: 10,
      page: this.page,
      query: {
        studentId: {
          $eq: this.userid,
        },
      },
      sort: { createDate: -1 },
    };

    if (this.type && this.type !== 'all') {
      condition.query.type = {
        $eq: +this.type,
      };
    }

    return condition;
  }

  @Watch('userid', {immediate: true})
  public onUserIdChange(val: string) {
    if (!val) { return; }
    console.log('userid发生改变，获取课时数据');
    this.fetchData(true);
  }



  public async fetchData(reset?: boolean) {
    if (reset) {
      this.page = 1;
    }
    this.loading = true;
    // const loading = this.$loading({color: 'red'});
    try {
      const {data: {data: {list, count}}} = await api.getHourrList(this.condition);
      this.count = count;
      this.page += 1;
      this.list = this.list.concat(list);
    } finally {
      this.loading = false;
      // loading.close()
    }

  }

  private async loadList() {
    if (this.list.length >= this.count) { return; }

    await this.fetchData();

  }
 }
</script>
