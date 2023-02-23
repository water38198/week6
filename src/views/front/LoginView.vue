<template>
  <div class="row justify-content-center">
    <div class="col-4">
      <form action="" class="mt-5">
        <h2 class="text-center">登入</h2>
        <div class="mb-4">
          <label for="username" class="form-label fs-5">使用者名稱:</label>
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="請輸入使用者名稱"
            v-model.trim="user.username"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="form-label fs-5">密碼:</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="請輸入使用者名稱"
            v-model.trim="user.password"
          />
        </div>
        <div>
          <button
            type="button"
            class="btn btn-primary btn-lg w-100"
            @click="login"
          >
            確定
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    login() {
      this.$http
        .post(`${VITE_URL}/v2/admin/signin`, {
          username: this.user.username,
          password: this.user.password,
        })
        .then((res) => {
          console.log(res);
          const { expired, token } = res.data;
          document.cookie = `myToken=${token}; expires=${new Date(expired)}`;
          alert("登入成功");
          this.$router.push("/admin/products");
        })
        .catch((err) => {
          console.log(err);
          alert("登入失敗");
        });
    },
  },
};
</script>
