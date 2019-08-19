<template>
  <div class="education-warper bg warp-direction">
    <div class="warp-direction__scroller">
      <mu-expansion-panel   v-for="item in list" :key="item._id">
        <div slot="header">{{item.package && item.package.name}}</div>
        <mu-list>
          <mu-list-item button :ripple="false" v-for="(stu, key) in item.fields" :key="key">
            <div class="label">{{stu.label}}</div>
            <div class="value">{{stu.value}}</div>
          </mu-list-item>
        </mu-list>
      </mu-expansion-panel>


    </div>
    <div class="no-data" v-if="!list.length"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import * as api from '@/api/student-package';
import * as enums from '@/const/enum';
import formatDate from '@/utils/format-date';
import { IStudentPackage } from '../../const/type/student-package';
const someModule = namespace('oauth');

@Component
export default class Course extends Vue {
  @someModule.State('userid') public userid!: string;
  public list: any[] = [];

  @Watch('userid', {immediate: true})
  public onUserIdChange(val: string) {
    if (!val) { return; }
    this.fetchData(true);
  }


  public async fetchData(reset?: boolean) {
    const {data: {data: {list}}} = await api.getStudentPackageList({
      studentIds: this.userid,
    });
    this.list = list.map((item) => {
      return {
        ...item,
        fields: this.getFields(item),
      };
    });
  }


  public getFields(arr: any) {
    const fileds = {
      activeTime: {
        label: '激活时间',
        value: arr.activeTime ? formatDate(new Date(arr.activeTime)) : '-',
      },
      endTime: {
        label: '结束时间',
        value: arr.endTime ? formatDate(new Date(arr.endTime)) : '-',
      },
      beOverdue: {
        label: '是否过时',
        value: arr.beOverdue ? '是' : '否',
      },


      isActive: {
        label: '是否激活',
        value: arr.isActive ? '是' : '否',
      },
      count: {
        label: '总学时',
        value: `${arr.count}学时`,
      },
      surplus: {
        label: '剩余课时',
        value: `${arr.surplus}学时`,
      },
      used: {
        label: '使用课时',
        value: `${arr.used}学时`,
      },
      students: {
        label: '使用的学生',
        value: (arr.student || []).map((item: {name: string}) => item.name).join(','),
      },
    };

    return fileds;
  }
}
</script>
<style lang="scss" scoped>
.label {
  width: 100px;
}
.value {
  flex: auto;
  text-align: right;
}

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
