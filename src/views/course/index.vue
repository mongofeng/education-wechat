<template>
  <div class="education-warper bg warp-direction">
    <!-- <div class="title mb20 bg-white">课程中心</div> -->
    <div class="warp-direction__scroller">
      <mu-expansion-panel :expand="true"  v-for="item in list" :key="item.day">
        <div slot="header">{{item.name}}</div>
        <mu-row>
          <mu-col span="6" v-for="(course, key) in item.children" :key="key">
            <div class="paper pb10">
                <div class="paper_title pb5">{{DAY_LABEL[key]}}</div>
                <div class="paper_content">{{course.length ? course.join(',') : '暂无课程'}}</div>
              </div>
            </mu-col>
        </mu-row>
        
      </mu-expansion-panel>

    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getWeek } from '@/utils/time';
import { namespace } from 'vuex-class';
import * as api from '@/api/course';
import * as enums from '@/const/enum';
const {
    mondayTimeStarmp,
    sundayTimeStarmp,
} = getWeek();
const someModule = namespace('oauth');
function getList() {
  return  [
    {
      name: '周日',
      day: 0,
      children: {
      },
    },
    {
      name: '周一',
      day: 1,
      children: {
      },
    },
    {
      name: '周二',
      day: 2,
      children: {
      },
    },
    {
      name: '周三',
      day: 3,
      children: {
      },
    },
    {
      name: '周四',
      day: 4,
      children: {
      },
    },
    {
      name: '周五',
      day: 5,
      children: {
      },
    },
    {
      name: '周六',
      day: 6,
      children: {
      },
    },
  ];
}
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


  public list: any[] = getList();

  public DAY_LABEL = enums.DAY_LABEL;
  private loading: boolean = false;

  @Watch('userid', {immediate: true})
  public onUserIdChange(val: string) {
    if (!val) { return; }
    this.fetchData(true);
  }




  public async fetchData(reset?: boolean) {
    if (reset) {
      this.page = 1;
    }
    const {data: {data: {list}}} = await api.getCourserList(this.condition);
    const result: any[] = getList();
    for (const item of list) {
      if (this.list[item.day].children[item.time]) {
        result[item.day].children[item.time].push(item.name);
      } else {
        result[item.day].children[item.time] = [item.name];
      }
    }

    this.list = result.filter((item) => {
      return item.children && Object.keys(item.children).length;
    });
  }
}
</script>
<style lang="scss">
.paper {
  &_title {
    color: #333;
    font-size: 12px;
  }

  &_content {
    font-size: 14px;
  }
}
</style>
