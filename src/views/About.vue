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
import { Form as FormProps } from 'muse-ui';
interface IForm {
  phone: string;
}
@Component
export default class About extends Vue {
  public $refs!: {
    /**
     * 表单
     */
    form: FormProps;
  };

  private phoneRules: any[] = [
    { validate: (val: string) => !!val, message: '必须填写手机号码' },
    { validate: (val: string) => val.length >= 3, message: '用户名长度大于3' },
  ];
  private validateForm: IForm = {
    phone: '',
  };

  public submit() {
    this.$refs.form.validate().then((result: boolean) => {
      // console.log("form valid: ", result);
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

