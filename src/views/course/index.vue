<template>
  <div class="education-warper bg warp-direction">
    <mu-data-table border :columns="columns" :data="list" :min-col-width="50">
      <template slot-scope="scope">
        <td>{{scope.row.name}}</td>
        <td class="is-left" style="padding-left:5px;padding-right: 0">
          <div v-for="(item, index) of scope.row[monrning]" :key="index">
            <div>{{item.name}}</div>
            <div>{{`${item.startTime}-${item.endTime}`}}</div>
          </div>
        </td>

        <td class="is-left" style="padding-left:5px;padding-right: 0">
          <div v-for="(item, index) of scope.row[afternoon]" :key="index">
            <div>{{item.name}}</div>
            <div>{{`${item.startTime}-${item.endTime}`}}</div>
          </div>
        </td>

        <td class="is-left" style="padding-left:5px;padding-right: 0">
          <div v-for="(item, index) of scope.row[evening]" :key="index">
            <div>{{item.name}}</div>
            <div>{{`${item.startTime}-${item.endTime}`}}</div>
          </div>
        </td>
      </template>
    </mu-data-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getWeek } from '@/utils/time';
import { namespace } from 'vuex-class';
import * as api from '@/api/course';
import * as enums from '@/const/enum';
const { mondayTimeStarmp, sundayTimeStarmp } = getWeek();
const someModule = namespace('oauth');

@Component
export default class Course extends Vue {
  get condition() {
    const condition: any = {
      limit: 1000,
      page: 1,
      query: {
        studentIds: {
          $in: [this.userid],
        },
        startDate: {
          $lte: sundayTimeStarmp,
        },
        endDate: {
          $gte: mondayTimeStarmp,
        },
      },
      sort: { createDate: -1 },
    };

    return condition;
  }

  @someModule.State('userid') public userid!: string;

  public page: number = 1;

  public monrning = enums.DAY.monrning; // '上午',
  public afternoon = enums.DAY.afternoon; // '下午',
  public evening = enums.DAY.evening; // '晚上',

  public list: any[] = getList();

  public DAY_LABEL = enums.DAY_LABEL;

  public columns = [
    { title: '时间', name: 'name', width: 70 },
    { title: '上午', name: enums.DAY.monrning, align: 'center' },
    { title: '下午', name: enums.DAY.afternoon, align: 'center' },
    { title: '晚上', name: enums.DAY.evening, align: 'center' },
  ];
  private loading: boolean = false;

  @Watch('userid', { immediate: true })
  public onUserIdChange(val: string) {
    if (!val) {
      return;
    }
    this.fetchData(true);
  }

  public async fetchData(reset?: boolean) {
    if (reset) {
      this.page = 1;
    }
    const {
      data: {
        data: { list },
      },
    } = await api.getCourserList(this.condition);
    const result: any[] = getList();
    for (const item of list) {
      const { name, startTime, endTime } = item;
      if (result[item.day][item.time].length) {
        result[item.day][item.time].push({ name, startTime, endTime });
      } else {
        result[item.day][item.time] = [{ name, startTime, endTime }];
      }
    }

    this.list = result;
    console.log(result);
  }
}

function getList() {
  return [
    {
      name: '周日',
      day: 0,
      [enums.DAY.monrning]: [], // '上午',
      [enums.DAY.afternoon]: [], // '下午',
      [enums.DAY.evening]: [], // '晚上',
    },
    {
      name: '周一',
      day: 1,
      [enums.DAY.monrning]: [], // '上午',
      [enums.DAY.afternoon]: [], // '下午',
      [enums.DAY.evening]: [], // '晚上',
    },
    {
      name: '周二',
      day: 2,
      [enums.DAY.monrning]: [], // '上午',
      [enums.DAY.afternoon]: [], // '下午',
      [enums.DAY.evening]: [], // '晚上',
    },

    {
      name: '周三',
      day: 3,
      [enums.DAY.monrning]: [], // '上午',
      [enums.DAY.afternoon]: [], // '下午',
      [enums.DAY.evening]: [], // '晚上',
    },
    {
      name: '周四',
      day: 4,
      [enums.DAY.monrning]: [], // '上午',
      [enums.DAY.afternoon]: [], // '下午',
      [enums.DAY.evening]: [], // '晚上',
    },
    {
      name: '周五',
      day: 5,
      [enums.DAY.monrning]: [], // '上午',
      [enums.DAY.afternoon]: [], // '下午',
      [enums.DAY.evening]: [], // '晚上',
    },
    {
      name: '周六',
      day: 6,
      [enums.DAY.monrning]: [], // '上午',
      [enums.DAY.afternoon]: [], // '下午',
      [enums.DAY.evening]: [], // '晚上',
    },
  ];
}
</script>
<style lang="scss" scoped>
</style>
