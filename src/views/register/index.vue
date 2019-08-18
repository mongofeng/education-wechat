<template>
  <div class="registry">
    <mu-container class="container">
      <mu-form ref="form" :model="validateForm">
        <mu-form-item label="手机号码" prop="phone" :rules="phoneRules">
          <mu-text-field v-model="validateForm.phone" prop="phone"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submit" full-width>提交</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>

    <mu-bottom-sheet :open.sync="open">
      <mu-list @item-click="closeBottomSheet">
        <mu-sub-header>请点击选择需要绑定的账号</mu-sub-header>
        <mu-list-item button :value="item._id" v-for="item in list" :key="item._id">
          <mu-list-item-title>{{item.name}}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as api from '@/api/student';
import * as type from '@/const/type/student';
import { namespace } from 'vuex-class';

const someModule = namespace('oauth');
interface IForm {
  phone: string;
}
@Component
export default class Register extends Vue {
  @someModule.Getter('openid') public openid!: string;
  @someModule.Action('fetchUserId') public fetchUserId!: () => Promise<void>;
  @someModule.State('userid') public userid!: string;

  public $refs!: {
    /**
     * 表单
     */
    // tslint:disable-next-line
    form: any;
  };

  public phoneRules: any[] = [
    { validate: (val: string) => !!val, message: '必须填写手机号码' },
    { validate: (val: string) => val.length >= 3, message: '用户名长度大于3' },
  ];

  public validateForm: IForm = {
    phone: '',
  };

  public open: boolean = false;

  public val: string = '';

  public list: type.IStudent[] = [];

  public mounted() {
    // this.init();
  }

  // 绑定微信
  public submit() {
    this.$refs.form.validate().then(async (valid: boolean) => {
      if (!valid) {
        return;
      }

      const {
        data: {
          data: { list, count },
        },
      } = await api.getStudentList({
        page: 1,
        limit: 5,
        query: {
          phone: this.validateForm.phone,
        },
      });
      if (count < 1) {
        this.$toast.error('暂无数据，请重新输入或者联系管理员');
        return;
      }
      this.list = list;
      this.open = true;
    });
  }

  // 选择微信的绑定
  public async closeBottomSheet(val: { value: string }) {
    this.open = false;
    if (!val.value) {
      return;
    }
    const result = this.list.filter((item) => item._id === val.value);
    if (!result || !result.length) {
      return;
    }

    const [user] = result;

    // if (user.openId) {
    //   this.$toast.error('该学员绑定了微信，请重新输入或者联系管理员');
    //   return;
    // }

    const { result: confirm } = await this.$confirm(
      `请确认绑定${user.name} ?`,
      {
        title: '信息',
      },
    );

    if (!confirm) {
      return;
    }

    await api.bindingWechat(val.value, {
      openId: this.openid,
    });

    await this.fetchUserId();

    this.$toast.success('绑定成功');

    this.$router.replace('/');
  }

  // 判断是否有userid，有就不能再绑定了
  private async init() {
    await this.fetchUserId();
    if (!!this.userid) {
      this.$router.replace('/');
    }
  }
}
</script>
<style lang="scss" scoped>
// @import '~@/assets/scss/utils.scss';
.registry {
  // margin: 0 auto;
  // width: 90%;
  overflow: hidden;
  height: 100%;
  padding: 0 20px;
  background-color: #f2f3f5;

  .container {
    margin-top: 150px;
  }
}
</style>

