<template>
  <div class="about">
    <h2 class="education-block__title">请绑定手机号</h2>
    <mu-container>
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item label="手机号码" prop="phone" :rules="phoneRules">
          <mu-text-field v-model="validateForm.phone" prop="phone"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submit" full-width>提交</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface IForm {
  phone: string;
}
@Component
export default class About extends Vue {
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

  public submit() {
    this .$refs.form.validate().then(async (valid: boolean) => {
      // console.log("form valid: ", result);
      const {result} = await this .$confirm('Hello world ?', {
        title: '信息',
      });
      if (result) {
        this .$toast.success('绑定成功');
      }
    });
  }
}
</script>
<style lang="scss" scoped>
// @import '~@/assets/scss/utils.scss';
.about {
  // margin: 0 auto;
  // width: 90%;
  height: 100%;
  padding: 0 20px;
  background-color: #f2f3f5;
}
</style>

