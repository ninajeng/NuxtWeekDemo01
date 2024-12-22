<script setup>
import { login } from '@/api/login';

const { setUserInfo } = useUserStore();

const config = useRuntimeConfig();
const cookieAccount = useCookie(config.public.cookieAccount);
const emailRecord = ref('')
const isRecordEmail = ref(false)

// DOM
const alertDialog = ref(null)

const labelAppendix = ref({
  email: 'E-mail',
  password: '密碼',
})

if(cookieAccount.value){
  emailRecord.value = cookieAccount.value
  isRecordEmail.value = true
}

const submit = async (inputValue) => {
  const email = inputValue[labelAppendix.value.email];
  const password = inputValue[labelAppendix.value.password];
  
  if(isRecordEmail.value) {
    cookieAccount.value = email;
  }else{
    cookieAccount.value = '';
  }

  const loginInfo = { email, password }

  const { status, result, token, message: errorMessage } = await login(loginInfo)

  if (!status) {
    if (errorMessage) {
      alertDialog.value.showErrorMessage({ message: errorMessage })
    } else {
      alertDialog.value.showErrorMessage()
    }
    return
  }

  if(!token || !result) {
    alertDialog.value.showErrorMessage()
    return
  }

  const cookie = useCookie(config.public.cookieToken);
  cookie.value = token;
  setUserInfo(result);

  const { id:userId }  = result
  await navigateTo(`/user/${userId}`)
};

</script>

<template>
  <ClientOnly>
    <AppAlert ref="alertDialog" />
  </ClientOnly>
  <div class="px-5 px-md-0">
    <div class="mb-10">
      <p class="mb-2 text-primary-100 fs-8 fs-md-7 fw-bold">
        享樂酒店，誠摯歡迎
      </p>
      <h1 class="text-neutral-0 fw-bold">
        立即開始旅程
      </h1>
    </div>
    <VeeForm @submit="submit" class="mb-10" v-slot="{ meta, errors }">
      <div class="mb-4 fs-8 fs-md-7">
        <label class="mb-2 text-neutral-0 fw-bold" for="email">
          電子信箱
        </label>
        <VeeField :name="labelAppendix.email" id="email"
          class="form-control p-4 text-neutral-100 fw-medium border-neutral-40"
          :class="{ 'is-invalid': errors[labelAppendix.email] }" placeholder="請輸入信箱" type="email" rules="required|email"
          :value="emailRecord" />
        <VeeErrorMessage :name="labelAppendix.email" class="text-danger" />
      </div>
      <div class="mb-4 fs-8 fs-md-7">
        <label class="mb-2 text-neutral-0 fw-bold" for="password">
          密碼
        </label>
        <VeeField :name="labelAppendix.password" id="password"
          class="form-control p-4 text-neutral-100 fw-medium border-neutral-40"
          :class="{ 'is-invalid': errors[labelAppendix.password] }" placeholder="請輸入密碼" type="password"
          rules="required|min:8" />
        <VeeErrorMessage :name="labelAppendix.password">
          <span class="text-danger">密碼需至少 8 碼以上</span>
        </VeeErrorMessage>
      </div>
      <div class="d-flex justify-content-between align-items-center mb-10 fs-8 fs-md-7">
        <div class="form-check d-flex align-items-end gap-2 text-neutral-0">
          <input id="remember" class="form-check-input" type="checkbox" :unchecked-value="false"
            v-model="isRecordEmail" />
          <label class="form-check-label fw-bold" for="remember">
            記住帳號
          </label>
        </div>
        <button class="text-primary-100 fw-bold text-decoration-underline bg-transparent border-0" type="button">
          忘記密碼？
        </button>
      </div>
      <button class="btn btn-primary-100 w-100 py-4 text-neutral-0 fw-bold" type="submit" :disabled="!meta.valid">
        會員登入
      </button>
    </VeeForm>

    <p class="mb-0 fs-8 fs-md-7">
      <span class="me-2 text-neutral-0 fw-medium">沒有會員嗎？</span>
      <NuxtLink to="signup" class="text-primary-100 fw-bold text-decoration-underline bg-transparent border-0">
        <span>前往註冊</span>
      </NuxtLink>
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import "bootstrap/scss/mixins/breakpoints";

$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
  xxxl: 1537px
);


input[type="password"] {
  font: small-caption;
  font-size: 1.5rem;
}

input::placeholder {
  color: #909090;
  font-size: 1rem;
  font-weight: 500;

  @include media-breakpoint-down(md) {
    font-size: 14px;
  }
}

.form-check-input {
  width: 1.5rem;
  height: 1.5rem;
}

.form-check-input:checked {
  background-color: #BF9D7D;
  border-color: #BF9D7D;
}
</style>