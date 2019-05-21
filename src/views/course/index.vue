<template>
  <div class="education-warper bg warp-direction">
    <!-- <div class="title mb20 bg-white">课程中心</div> -->
    <div class="warp-direction__scroller">
      <mu-expansion-panel :expand="true"  v-for="item in list" :key="item.day">
        <div slot="header">{{item.name}}</div>
        <div class="demo-paper" v-for="(course, key) in item.children" :key="key">
          <div>上午</div>
          <div>{{course.length ? course.join(',') : '暂无课程'}}</div>
        </div>
      </mu-expansion-panel>

    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getWeek } from '@/utils/time';
import { namespace } from 'vuex-class';
import * as api from '@/api/course'
const {
    mondayTimeStarmp,
    sundayTimeStarmp,
} = getWeek()
const someModule = namespace('oauth');
@Component
export default class Course extends Vue {
  @someModule.State('userid') public userid!: string;
  private loading: boolean = false;

  public page: number = 1;


  public list: any[] = [
    {
      name: '周日',
      day: 0,
      children: {
        1: [],
        2: [],
        3: []
      }
    },
    {
      name: '周一',
      day: 1,
      children: {
        1: [],
        2: [],
        3: []
      }
    },
    {
      name: '周二',
      day: 2,
      children: {
        1: [],
        2: [],
        3: []
      }
    },
    {
      name: '周三',
      day: 3,
      children: {
        1: [],
        2: [],
        3: []
      }
    },
    {
      name: '周四',
      day: 4,
      children: {
        1: [],
        2: [],
        3: []
      }
    },
    {
      name: '周五',
      day: 5,
      children: {
        1: [],
        2: [],
        3: []
      }
    },
    {
      name: '周六',
      day: 6,
      children: {
        1: [],
        2: [],
        3: []
      }
    },
  ];

  get condition () {
    const condition: any = {
        limit: 1000,
        page: 1,
        query: {
            studentIds: {
                $in: [this.userid]
            },
            startDate: {
                $lte: sundayTimeStarmp
            },
            endDate: {
                $gte: mondayTimeStarmp,
            }
        },
        sort: { createDate: -1 }
    }

    return condition
  }


  public mounted() {
    this.fetchData(true);
  }




  public async fetchData(reset?: boolean) {
    if (reset) {
      this.page = 1;
    }
    const {data: {data: {list}}} = await api.getCourserList(this.condition);

    console.log(list)
    for (let item of list) {
      this.list[item.day].children[item.time].push(item.name)
    }
  }
}
</script>
<style lang="scss">
.demo-paper {
  display: table-cell;
  height: 100px;
  width: 100px;
  margin: 20px;
  text-align: center;
}
</style>