<template>
  <div class="education-warper bg">
    <div class="education-warper-container">
    <mu-data-table  :columns="columns" :data="list" :min-col-width="50">
      <template slot-scope="scope">
        <td>{{scope.row.name}}</td>
        <td class="is-center" >
          <div v-for="(item, index) of scope.row[monrning]" :key="index">
            <div>{{item.name}}</div>
            <!-- <div>{{`${item.startTime}-${item.endTime}`}}</div> -->
            <div>{{item.startTime}}</div>
          </div>
        </td>

        <td class="is-center" >
          <div v-for="(item, index) of scope.row[afternoon]" :key="index">
            <div>{{item.name}}</div>
             <div>{{item.startTime}}</div>
          </div>
        </td>

        <td class="is-center" >
          <div v-for="(item, index) of scope.row[evening]" :key="index">
            <div>{{item.name}}</div>
             <div>{{item.startTime}}</div>
          </div>
        </td>
      </template>
    </mu-data-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getWeek } from '@/utils/time';
import { namespace } from 'vuex-class';
import * as api from '@/api/course';
import * as enums from '@/const/enum';
const { monday, sunday } = getWeek();
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
                $lte: sunday,
            },
            endDate: {
                $gte: monday,
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
      for (const key of item.day) {

        if (monday) {
                const currentDate  = new Date(monday.getTime());
                const  offset = (key -  1) >=  0 ? (key -  1) : 6;
                currentDate.setDate(currentDate.getDate() + offset);

                // 结束日期少于对应的那天的不展示
                const endDate = new Date(item.endDate);
                if (endDate.getTime() < currentDate.getTime()) {
                    continue;
                }

                // 开始日期大于对应那天的不展示
                const startDate = new Date(item.startDate);
                if (startDate.getTime() > currentDate.getTime()) {
                   continue;
                }
            }
        if (result[key][item.time].length) {
          result[key][item.time].push({ name, startTime, endTime });
        } else {
          result[key][item.time] = [{ name, startTime, endTime }];
        }
      }

    }

    this.list = result.slice(1).concat(result[0]);
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
