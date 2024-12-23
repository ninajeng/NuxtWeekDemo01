<script setup>
import { Icon } from '@iconify/vue';

import { verifyEmail } from '@/api/emailVerify';
import { signup } from '@/api/signup';

const isEmailAndPasswordValid = ref(false);

// DOM
const alertDialog = ref(null)
const yearSelect = ref(null)
const monthSelect = ref(null)
const dateSelect = ref(null)
const citySelect = ref(null)
const zoneSelect = ref(null)

const backupData = ref({})

const labelAppendix = ref({
  email: 'E-mail',
  password: '密碼',
})

const delaySecondTime = 5;
const pageRedirectSetting = {
  message: `${delaySecondTime} 秒後導向登入頁`,
  replacePath: '/account/login',
  timer: delaySecondTime * 1000
}

const verifyEmailAndPassword = async (inputValue) => {
  const email = inputValue[labelAppendix.value.email];
  const password = inputValue[labelAppendix.value.password];
  const confirmPassword = inputValue.confirmPassword;

  const { status, result, message: errorMessage } = await verifyEmail(email)

  if (!status) {
    if (errorMessage) {
      alertDialog.value.showErrorMessage({ message: errorMessage })
    } else {
      alertDialog.value.showErrorMessage()
    }
    return
  }

  if (result.isEmailExists) {
    const message = {
      title: '帳號已存在',
      ...pageRedirectSetting
    }
    alertDialog.value.showErrorMessage(message)
  } else {
    backupData.value = {
      email, password, confirmPassword
    }
    isEmailAndPasswordValid.value = true
  }
};

const phoneRegex = new RegExp('^09\\d{8}$');
const checkPhone = (phone) => phoneRegex.test(phone);

const dayCount = ref(31);
const checkCalender = () => {
  const year = yearSelect.value.value;
  const month = monthSelect.value.value;
  const dateDOM = dateSelect.value;
  dayCount.value = new Date(year, month, 0).getDate();
  if (dateDOM.value > dayCount.value) {
    dateDOM.value = 1;
  }
}

const { cityZoneList, cityDefault, zoneOptions,setZones } = useCityData();

setZones(cityDefault.value)

const resetZoneSelect = (city) => {
  setZones(city);
  if(zoneSelect.value) {
    zoneSelect.value.value = 0;
  }
}

const register = async (inputValue) => {
  const { name, phone, year, month, date, city, zoneIndex, addressDetail: detail } = inputValue
  const birthday = `${year}/${month}/${date}`;
  const zipcode = cityZoneList.value[city].zones[zoneIndex].zipCode;

  const signupData = {
    email: backupData.value.email,
    password: backupData.value.password,
    name,
    phone,
    birthday,
    address: {
      zipcode,
      detail
    }
  }

  backupData.value = {
    ...signupData,
    ...inputValue,
    confirmPassword: backupData.value.confirmPassword
  }

  const { status, result, message: errorMessage } = await signup(signupData);

  if (!status) {
    if (errorMessage) {
      const message = {
        title: '註冊失敗',
        message: errorMessage
      }
      alertDialog.value.showErrorMessage(message)
    } else {
      alertDialog.value.showErrorMessage()
    }
    isEmailAndPasswordValid.value = false
    return
  }

  const message = {
    title: '註冊成功！',
    ...pageRedirectSetting
  }
  alertDialog.value.showSuccessMessage(message)
}

</script>

<template>
  <ClientOnly>
    <AppAlert ref="alertDialog" />
  </ClientOnly>
  <div class="p-5 px-md-0 py-md-30">
    <div class="mb-10">
      <p class="mb-2 text-primary-100 fs-8 fs-md-7 fw-bold">
        享樂酒店，誠摯歡迎
      </p>
      <h1 class="mb-4 text-neutral-0 fw-bold">
        立即註冊
      </h1>

      <div class="d-flex align-items-center py-4 gap-2">
        <div class="d-flex flex-column align-items-center gap-1 text-neutral-0">
          <span :class="{ 'd-none': isEmailAndPasswordValid }" class="step p-2 bg-primary-100 rounded-circle">1</span>
          <Icon :class="{ 'd-none': !isEmailAndPasswordValid }" class="p-2 fs-3 bg-primary-100 rounded-circle"
            icon="material-symbols:check" />
          <p class="mb-0 fs-8 fs-md-7 fw-bold">
            輸入信箱及密碼
          </p>
        </div>

        <hr class="flex-grow-1 my-0 border border-neutral-60 opacity-100">

        <div :class="{
          'text-neutral-0': isEmailAndPasswordValid, 'text-neutral-60': !isEmailAndPasswordValid
        }" class="d-flex flex-column align-items-center gap-1">
          <span :class="{
            'bg-primary-100': isEmailAndPasswordValid, 'bg-transparent border border-neutral-60': !isEmailAndPasswordValid
          }" class="step p-2 rounded-circle">2</span>
          <p class="mb-0 fs-8 fs-md-7 fw-bold">
            填寫基本資料
          </p>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <VeeForm @submit="verifyEmailAndPassword" v-slot="{ meta, errors }" ref="emailForm"
        :class="{ 'd-none': isEmailAndPasswordValid }">
        class="mb-4">
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="email">
            電子信箱
          </label>
          <VeeField :name="labelAppendix.email" id="email"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40 mb-1"
            :class="{ 'is-invalid': errors[labelAppendix.email] }" placeholder="hello@exsample.com" type="email"
            rules="required|email" :value="backupData.email" />
          <VeeErrorMessage :name="labelAppendix.email" class="text-danger" />
        </div>
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="password">
            密碼
          </label>
          <VeeField :name="labelAppendix.password" id="password"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40 mb-1"
            :class="{ 'is-invalid': errors[labelAppendix.password] }" placeholder="請輸入密碼" type="password"
            rules="required|min:8" :value="backupData.password" />
          <VeeErrorMessage :name="labelAppendix.password">
            <span class="text-danger">密碼需至少 8 碼以上</span>
          </VeeErrorMessage>
        </div>
        <div class="mb-10 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="confirmPassword">
            確認密碼
          </label>
          <VeeField name="confirmPassword" id="confirmPassword"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40 mb-1"
            :class="{ 'is-invalid': errors['confirmPassword'] }" placeholder="請再輸入一次密碼" type="password"
            :rules="`required|confirmed:@${labelAppendix.password}`" :value="backupData.confirmPassword" />
          <VeeErrorMessage name="confirmPassword">
            <span class="text-danger">兩次密碼輸入不相同</span>
          </VeeErrorMessage>
        </div>

        <button class="btn btn-neutral-40 w-100 py-4 text-neutral-60 fw-bold" type="submit" :disabled="!meta.valid">
          下一步
        </button>
      </VeeForm>

      <VeeForm @submit="register" v-slot="{ meta, errors }" :class="{ 'd-none': !isEmailAndPasswordValid }"
        class="mb-4">
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="name">
            姓名
          </label>
          <VeeField name="name" id="name"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40 rounded-3 mb-1"
            :class="{ 'is-invalid': errors['name'] }" placeholder="請輸入姓名" type="text" rules="required|min:2"
            :value="backupData.name" />
          <VeeErrorMessage name="name">
            <span class="text-danger">姓名需至少 2 個字</span>
          </VeeErrorMessage>
        </div>
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="phone">
            手機號碼
          </label>
          <VeeField name="phone" id="phone"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40 rounded-3 mb-1"
            :class="{ 'is-invalid': errors['phone'] }" placeholder="請輸入手機號碼" type="tel" :rules="checkPhone"
            :value="backupData.phone" />
          <VeeErrorMessage name="phone">
            <span class="text-danger">手機格式不正確</span>
          </VeeErrorMessage>
        </div>
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="birth">
            生日
          </label>
          <div class="d-flex gap-2">
            <VeeField name="year" id="birth" class="form-select p-4 text-neutral-80 fw-medium rounded-3" as="select"
              :value="backupData.year || 1990" @change="checkCalender" ref="yearSelect">
              <option v-for="year in 65" :key="year" :value="year + 1958">
                {{ year + 1958 }} 年
              </option>
            </VeeField>
            <VeeField name="month" class="form-select p-4 text-neutral-80 fw-medium rounded-3" as="select"
              :value="backupData.month || 1" @change="checkCalender" ref="monthSelect">
              <option v-for="month in 12" :key="month" :value="month">
                {{ month }} 月
              </option>
            </VeeField>
            <VeeField name="date" class="form-select p-4 text-neutral-80 fw-medium rounded-3" as="select"
              :value="backupData.date || 1" ref="dateSelect">
              <option v-for="date in dayCount" :key="date" :value="date">
                {{ date }} 日
              </option>
            </VeeField>
          </div>
        </div>
        <div class="mb-4 fs-8 fs-md-7">
          <label class="form-label text-neutral-0 fw-bold" for="address">
            地址
          </label>
          <div>
            <div class="d-flex gap-2 mb-2">
              <VeeField name="city" class="form-select p-4 text-neutral-80 fw-medium rounded-3" ref="citySelect"
                as="select" :value="backupData.city || cityDefault" @change="resetZoneSelect($event.target.value)">
                <option :value="cityName" v-for="(cityInfo, cityName) in cityZoneList" :key="`city-${cityName}`">
                  {{ cityInfo.name }}
                </option>
              </VeeField>
              <VeeField name="zoneIndex" class="form-select p-4 text-neutral-80 fw-medium rounded-3" ref="zoneSelect"
                as="select" :value="backupData.zoneIndex | 0">
                <option :value="index" v-for="(zone, index) in zoneOptions" :key="`zone-${index}`">
                  {{ zone }}
                </option>
              </VeeField>
            </div>
            <VeeField name="addressDetail" id="address" type="text" class="form-control p-4 rounded-3 mb-1"
              :class="{ 'is-invalid': errors['addressDetail'] }" placeholder="請輸入詳細地址" rules="required"
              :value="backupData.addressDetail" />
            <VeeErrorMessage name="addressDetail">
              <span class="text-danger">地址為必填</span>
            </VeeErrorMessage>
          </div>
        </div>
        <div class="mb-10">
          <div class="form-check d-flex align-items-end gap-2 text-neutral-0">
            <VeeField name="agreementCheck" id="agreementCheck" class="form-check-input" type="checkbox"
              rules="required" value="true" />
            <label class="form-check-label fw-bold" for="agreementCheck">
              我已閱讀並同意本網站個資使用規範
            </label>
          </div>
          <VeeErrorMessage name="agreementCheck">
            <span class="text-danger">請閱讀本網站個資使用規範</span>
          </VeeErrorMessage>
        </div>

        <button class="btn btn-primary-100 w-100 py-4 text-neutral-0 fw-bold" type="submit" :disabled="!meta.valid">
          完成註冊
        </button>
      </VeeForm>
    </div>

    <p class="mb-0 fs-8 fs-md-7">
      <span class="me-2 text-neutral-0 fw-medium">已經有會員了嗎？</span>
      <NuxtLink to="login" class="text-primary-100 fw-bold text-decoration-underline bg-transparent border-0">
        <span>立即登入</span>
      </NuxtLink>
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/stylesheets/page/breakpoints";

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

.step {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
}
</style>