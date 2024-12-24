<script setup>
import { updateUserInfo } from '@/api/updateUserInfo';

const config = useRuntimeConfig();
const token = useCookie(config.public.cookieToken).value;

const isEditPassword = ref(false);
const isEditProfile = ref(false);

const account = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// DOM
const alertDialog = ref(null)
const yearSelect = ref(null)
const monthSelect = ref(null)
const dateSelect = ref(null)
const citySelect = ref(null)
const zoneSelect = ref(null)

const { userInfo } = useUserStore();

const birthday = new Date(userInfo.birthday)
const userBirthday = ref({
  year: birthday.getFullYear(),
  month: birthday.getMonth() + 1,
  date: birthday.getDate(),
})

const { cityZoneList, zoneOptions, getCityInfo, setZones } = useCityData();
const { city, cityName, zone, zoneIndex } = getCityInfo(userInfo.address.zipcode);
const addressDetail = userInfo.address.detail;

setZones(city)
const resetZoneSelect = (city) => {
  setZones(city);
  if(zoneSelect.value) {
    zoneSelect.value.value = 0;
  }
}

const phoneRegex = new RegExp('^09\\d{8}$');
const telRegex = new RegExp('\\(\\d{2,3}\\) \\d{3}\\-\\d{4}');
const checkPhone = (phone) => phoneRegex.test(phone) || telRegex.test(phone);

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

const submitProfile = (inputValue) => {
  const { _id:userId } = userInfo;
  const { name, phone, year, month, date, city, zoneIndex, addressDetail: detail } = inputValue
  const birthday = `${year}/${month}/${date}`;
  const zipcode = cityZoneList.value[city].zones[zoneIndex].zipCode;
;
  const newData = {
    userId,
    name,
    phone,
    birthday,
    address: {
      zipcode,
      detail
    }
  }
  updateData(newData)
}

const updateData = async (data) => {
  const { status, message: errorMessage } = await updateUserInfo(data, token);

  if (!status) {
    if (errorMessage) {
      const message = {
        title: '儲存失敗',
        message: errorMessage
      }
      alertDialog.value.showErrorMessage(message)
    } else {
      alertDialog.value.showErrorMessage()
    }
    return
  }

  const message = {
    title: '儲存成功！',
    reloadPage: true
  }
  alertDialog.value.showSuccessMessage(message)
}

const submitPassword = () => {
  const { _id:userId } = userInfo;
  const { oldPassword, newPassword } = account.value;
  const newData = {
    userId,
    oldPassword,
    newPassword
  }
  console.log(newData)
  updateData(newData)

//   {
//   "userId": "6523e9fc3a22dd8d8207ef80",
//   "name": "Kylie Stanley",
//   "phone": "(937) 233-2482",
//   "birthday": "1948/6/5",
//   "address": {
//     "zipcode": 802,
//     "detail": "文山路23號"
//   },
//   "oldPassword": "舊密碼",
//   "newPassword": "新密碼"
// }



}
</script>

<template>
  <ClientOnly>
    <AppAlert ref="alertDialog" />
    <div class="row gap-6 gap-md-0">
      <div class="col-12 col-md-5">
        <section class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-6 p-md-10 bg-neutral-0">
          <h2 class="fs-6 fs-md-5 fw-bold">
            修改密碼
          </h2>
          <div class="d-flex flex-column gap-4 gap-md-6">
            <div class="fs-8 fs-md-7">
              <p class="mb-2 text-neutral-80 fw-medium">
                電子信箱
              </p>
              <span class="form-control pe-none p-0 text-neutral-100 fw-bold border-0">{{ userInfo.email }}</span>
            </div>

            <div class="d-flex justify-content-between align-items-center" :class="{ 'd-none': isEditPassword }">
              <div>
                <label class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-medium">
                  密碼
                </label>
                <input class="form-control pe-none p-0 text-neutral-100 fs-5 fs-md-3 fw-bold border-0" type="password"
                  value="**********">
              </div>

              <button
                class="flex-shrink-0 text-primary-100 fs-8 fs-md-7 fw-bold text-decoration-underline border-0 bg-transparent"
                type="button" @click="isEditPassword = !isEditPassword">
                重設
              </button>
            </div>
            <VeeForm @submit="submitPassword" v-slot="{ meta, errors }">
              <div class="d-flex flex-column gap-4 gap-md-6" :class="{ 'd-none': !isEditPassword }">
                <div>
                  <label for="oldPassword" class="form-label fs-8 fs-md-7 fw-bold">舊密碼</label>
                  <VeeField name="oldPassword" id="oldPassword" class="form-control fs-7 rounded-3 mb-1"
                    :class="{ 'is-invalid': errors.oldPassword }" placeholder="請輸入密碼" type="password"
                    rules="required|min:8" v-model="account.oldPassword" />
                  <VeeErrorMessage name="oldPassword">
                    <span class="text-danger">密碼需至少 8 碼以上</span>
                  </VeeErrorMessage>
                </div>

                <div>
                  <label for="newPassword" class="form-label fs-8 fs-md-7 fw-bold">新密碼</label>
                  <VeeField name="newPassword" id="newPassword" class="form-control fs-7 rounded-3 mb-1"
                    :class="{ 'is-invalid': errors.newPassword }" placeholder="請輸入新密碼" type="password"
                    rules="required|min:8|is_not:@oldPassword" v-model="account.newPassword" />
                  <VeeErrorMessage name="newPassword">
                    <span class="text-danger">新密碼不得與舊密碼相同，且需至少 8 碼以上</span>
                  </VeeErrorMessage>
                </div>

                <div>
                  <label for="confirmPassword" class="form-label fs-8 fs-md-7 fw-bold">確認新密碼</label>
                  <VeeField name="confirmPassword" id="confirmPassword" class="form-control fs-7 rounded-3 mb-1"
                    :class="{ 'is-invalid': errors.confirmPassword }" placeholder="請再輸入一次新密碼" type="password"
                    rules="required|confirmed:@newPassword" v-model="account.confirmPassword" />
                  <VeeErrorMessage name="confirmPassword">
                    <span class="text-danger">兩次密碼輸入不相同</span>
                  </VeeErrorMessage>
                </div>
              </div>

              <button :class="{ 'd-none': !isEditPassword }"
                class="btn btn-neutral-40 align-self-md-start px-8 py-4 text-neutral-60 rounded-3 mt-5" type="submit"
                :disabled="!meta.valid">
                儲存設定
              </button>
            </VeeForm>
          </div>
        </section>
      </div>

      <div class="col-12 col-md-7">
        <section class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-6 p-md-10 bg-neutral-0">
          <h2 class="fs-6 fs-md-5 fw-bold">
            基本資料
          </h2>
          <VeeForm @submit="submitProfile" v-slot="{ meta, errors }" class="d-flex flex-column gap-4 gap-md-6">
            <div class="fs-8 fs-md-7">
              <label class="form-label"
                :class="{ 'fw-bold text-neutral-100': isEditProfile, 'fw-medium text-neutral-80': !isEditProfile }"
                for="name">
                姓名
              </label>
              <VeeField id="name" name="name" class="form-control text-neutral-100 fw-bold mb-1"
                :class="{ 'pe-none p-0 border-0': !isEditProfile, 'p-4': isEditProfile, 'is-invalid': errors.name }"
                type="text" :value="userInfo.name" rules="required|min:2" />
              <VeeErrorMessage name="name">
                <span class="text-danger">姓名需至少 2 個字</span>
              </VeeErrorMessage>
            </div>

            <div class="fs-8 fs-md-7">
              <label class="form-label"
                :class="{ 'fw-bold text-neutral-100': isEditProfile, 'fw-medium text-neutral-80': !isEditProfile }"
                for="phone">
                手機號碼
              </label>
              <VeeField id="phone" name="phone" class="form-control text-neutral-100 fw-bold mb-1"
                :class="{ 'pe-none p-0 border-0': !isEditProfile, 'p-4': isEditProfile, 'is-invalid': errors.phone }"
                type="tel" :value="userInfo.phone" :rules="checkPhone" />
              <VeeErrorMessage name="phone">
                <span class="text-danger">手機格式不正確</span>
              </VeeErrorMessage>
            </div>

            <div class="fs-8 fs-md-7">
              <label class="form-label"
                :class="{ 'fw-bold text-neutral-100': isEditProfile, 'fw-medium text-neutral-80': !isEditProfile }"
                for="birth">
                生日
              </label>
              <span class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
                :class="{ 'd-none': isEditProfile }">{{ `${userBirthday.year} 年 ${userBirthday.month} 月
                ${userBirthday.date} 日` }}</span>
              <div class="d-flex gap-2" :class="{ 'd-none': !isEditProfile }">
                <VeeField name="year" id="birth" class="form-select p-4 text-neutral-80 fw-medium rounded-3" as="select"
                  :value="userBirthday.year" @change="checkCalender" ref="yearSelect">
                  <option v-for="year in 65" :key="year" :value="year + 1958">
                    {{ year + 1958 }} 年
                  </option>
                </VeeField>
                <VeeField name="month" class="form-select p-4 text-neutral-80 fw-medium rounded-3" as="select"
                  rules="required" :value="userBirthday.month" @change="checkCalender" ref="monthSelect">
                  <option v-for="month in 12" :key="month" :value="month">
                    {{ month }} 月
                  </option>
                </VeeField>
                <VeeField name="date" class="form-select p-4 text-neutral-80 fw-medium rounded-3" as="select"
                  rules="required" :value="userBirthday.date" ref="dateSelect">
                  <option v-for="date in dayCount" :key="date" :value="date">
                    {{ date }} 日
                  </option>
                </VeeField>
              </div>
            </div>

            <div class="fs-8 fs-md-7">
              <label class="form-label"
                :class="{ 'fw-bold text-neutral-100': isEditProfile, 'fw-medium text-neutral-80': !isEditProfile }"
                for="address">
                地址
              </label>
              <span class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
                :class="{ 'd-none': isEditProfile }">{{ `${cityName}${zone}${addressDetail}` }}</span>
              <div :class="{ 'd-none': !isEditProfile }">
                <div class="d-flex gap-2 mb-2">
                  <VeeField name="city" class="form-select p-4 text-neutral-80 fw-medium rounded-3" ref="citySelect"
                    rules="required" as="select" :value="city" @change="resetZoneSelect($event.target.value)">
                    <option :value="cityName" v-for="(cityInfo, cityName) in cityZoneList" :key="`city-${cityName}`">
                      {{ cityInfo.name }}
                    </option>
                  </VeeField>
                  <VeeField name="zoneIndex" class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                    rules="required" ref="zoneSelect" as="select" :value="zoneIndex">
                    <option :value="index" v-for="(zone, index) in zoneOptions" :key="`zone-${index}`">
                      {{ zone }}
                    </option>
                  </VeeField>
                </div>
                <VeeField name="addressDetail" id="address" type="text" class="form-control p-4 rounded-3 mb-1"
                  :class="{ 'is-invalid': errors.addressDetail }" placeholder="請輸入詳細地址" rules="required"
                  v-model="addressDetail" />
                <VeeErrorMessage name="addressDetail">
                  <span class="text-danger">地址為必填</span>
                </VeeErrorMessage>
              </div>
            </div>
            <button :class="{ 'd-none': isEditProfile }"
              class="btn btn-outline-primary-100 align-self-start px-8 py-4 rounded-3" type="button"
              @click="isEditProfile = !isEditProfile">
              編輯
            </button>

            <button :class="{ 'd-none': !isEditProfile }"
              class="btn btn-neutral-40 align-self-md-start px-8 py-4 text-neutral-60 rounded-3" type="submit"
              :disabled="!meta.valid || !meta.dirty">
              儲存設定
            </button>
          </VeeForm>
        </section>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.rounded-3xl {
  border-radius: 1.25rem;
}

input[type="password"] {
  font: small-caption;
}

.form-control::placeholder {
  --neutral-60: #909090;
  color: var(--neutral-60);
  font-weight: 500;
}
</style>