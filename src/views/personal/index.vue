<template>
  <div class="education-warper bg">
    <div class="education-warper-container">
      <mu-card-header
        :title="nickName"
        :subTitle="SEX_LABEL[sex]"
        class="bg-white mb20">
        <mu-avatar slot="avatar">
          <img :src="headimgurl">
        </mu-avatar>
      </mu-card-header>


      <mu-list class="bg-white">
        <mu-sub-header>学员列表</mu-sub-header>
        <mu-list-item button :ripple="false" v-for="item in options" :key="item.id" @click="onSelect(item.id)">
          <mu-list-item-action>
            <mu-icon :value="item.icon"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{item.title}}</mu-list-item-title>
          <mu-list-item-action v-if="item.id === userid">
            <mu-icon value="done_outline" color="green"></mu-icon>
            
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
      <mu-divider></mu-divider>
      <mu-list class="bg-white">
        <mu-sub-header>操作</mu-sub-header>
        <mu-list-item button :ripple="false" to="/register" key="student-package">
          <mu-list-item-title>绑定新学员</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="add"></mu-icon>
          </mu-list-item-action>
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
  @someModule.State('userList') public userList!: type.IStudent[];
  @someModule.State('userid') public userid!: string;
  @someModule.Getter('openid') public openid!: string;
  @someModule.Action('onChangeUser') public onChangeUser!: (id: string) => void;

  private headimgurl: string = '~@/assets/images/uicon.jpg';
  private nickName: string = '';
  private sex: number = 1;
  private SEX_LABEL: any = enums.SEX_LABEL;



  get options(): ITab[] {
    return this.userList.map((item) => {
      const {name} = item;
      return {
        icon: 'account_box',
        title: name,
        id: item._id,
      };
    });
  }

  @Watch('userid', {immediate: true})
  public onUserIdChange(val: string) {
    if (!val) { return; }
    console.log('userid change');
    // this.fetchTotalHours();
  }

  @Watch('openid', {immediate: true})
  public onopenidChange(val: string) {
    if (!val) { return; }
    this.fetchUserInfo();
  }


  public async fetchUserInfo() {
    let {data} = await apiWechat.fetchUserInfo({
      openid: this.openid,
    });

    if ((data  as any).data) {
      data = (data  as any).data
    }
    this.headimgurl = data.headimgurl;
    this.nickName = data.nickname;
    this.sex = data.sex;
  }


  public onSelect(id: string) {
    this.onChangeUser(id);
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

