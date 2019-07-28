<template>
  <div class="education-warper bg warp-direction">
    <mu-list>
      <mu-list-item button :ripple="false" v-for="(stu, key) in data" :key="key">
        <div class="label">{{stu.label}}</div>
        <div class="value" v-if="stu.array">
            <div v-for="(word, index) of stu.value" :key="index" :class="index">
              {{word}}
            </div>
        </div>
        <div class="value" v-else>
          {{stu.value || '-'}}
        </div>
      </mu-list-item>
    </mu-list>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api/hour';
import * as enums from '@/const/enum';
import formatDate from '@/utils/format-date';
import { IHour } from '@/const/type/hour';

@Component
export default class HourDetail extends Vue {
  @Prop()
  id!:string
  
  data: any = {}
  mounted () {
    this.fetchData()
  }


  public async fetchData() {
    const { data: {data} } = await api.getHour(this.id);
    this.data = this.getFields(data);
  }


  public getFields(arr: any) {
    const fileds = {
      createDate: {
        label: '创建时间',
        value: arr.createDate ? formatDate(new Date(arr.createDate)) : '-',
      },
      type: {
        label: '课时类型',
        value: (enums.COURSE_HOUR_ACTION_TYPE_LABEL as any)[arr.type],
      },

      num: {
        label: '学时数量',
        value: `${arr.num}学时`,
      },
    
      course: {
        label: '课程详情',
        value: (arr.course || []).map((item: any) => {
          return `${item.name}:${item.count}课时`
        }),
        array: true
      },
      desc: {
        label: '备注',
        value: arr.desc
      }
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
</style>