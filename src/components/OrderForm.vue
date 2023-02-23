<template>
  <div class="row justify-content-center">
    <div class="col-4">
      <VFrom
        v-slot="{ errors }"
        @submit="sentOrder"
        class="my-5"
        ref="userForm"
      >
        <div class="mb-3">
          <label for="name" class="h5">姓名:</label>
          <Field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入 姓名"
            rules="required"
            v-model="user.name"
          ></Field>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="tel" class="h5">電話:</label>
          <Field
            id="tel"
            name="電話"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入 電話"
            :rules="isPhone"
            v-model="user.tel"
          ></Field>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="email" class="h5">電子郵件:</label>
          <Field
            id="email"
            name="電子郵件"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['電子郵件'] }"
            placeholder="請輸入 電子郵件"
            rules="required||email"
            v-model="user.email"
          ></Field>
          <ErrorMessage name="電子郵件" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="address" class="h5">地址:</label>
          <Field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入 地址"
            rules="required"
            v-model="user.address"
          ></Field>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="message" class="h5">附註:</label>
          <Field
            id="message"
            name="附註"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['附註'] }"
            placeholder="請輸入 附註"
            v-model="user.message"
            as="textarea"
            cols="10"
            rows="10"
          ></Field>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary w-100">送出</button>
        </div>
      </VFrom>
    </div>
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env;

import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale("zh_TW");
export default {
  data() {
    return {
      user: {},
    };
  },
  components: {
    VFrom: Form,
    Field,
    ErrorMessage,
  },
  methods: {
    sentOrder() {
      const data = { user: this.user };
      this.$http
        .post(`${VITE_URL}/v2/api/${VITE_PATH}/order`, { data })
        .then((res) => {
          alert(res.data.message);
          this.getCart();
          this.$refs.userForm.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    isPhone(value) {
      //電話驗證
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要正確的電話號碼";
    },
  },
  props: ["getCart"],
};
</script>
