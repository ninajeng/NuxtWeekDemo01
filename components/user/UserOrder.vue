<script setup>
import { Icon } from '@iconify/vue';

import { deleteOrder } from '@/api/deleteOrder';

const comingOrders = ref([]);
const finishedOrders_show = ref([]);
const finishedOrders_all = [];
const showOrderNum = ref(2);
const addOderNum = 2;
const isAllOrders = ref(true);
const isLoading = ref(false);

// DOM
const alertDialog = ref(null);
const confirmModal = ref(null);

const { $bootstrap } = useNuxtApp();
onMounted(() => {
  confirmModal.value = new $bootstrap.Modal(document.getElementById('cancelModal'));
})

const { countDay } = useDayNum();
const { formatNumber } = useFormatNumber();

const config = useRuntimeConfig();
const cookieToken = useCookie(config.public.cookieToken);
const token = cookieToken.value;

import { getOrderList } from '@/api/orderList';

const { status, result: orderList, message: errorMessage } = await getOrderList(token);

if(status) {
  orderList.forEach(order => {
    if(order.status < 0) return
    const isFinishOrder = new Date() > new Date(order.checkInDate);
    const checkInDate = order.checkInDate.split('T')[0];
    const checkOutDate = order.checkOutDate.split('T')[0];
    const dayCount = countDay(checkInDate, checkOutDate)
    const orderInfo = { ...order, checkInDate, checkOutDate, dayCount }
    if(isFinishOrder) {
      finishedOrders_all.push(orderInfo)
    }else{
      comingOrders.value.push(orderInfo)
    }
  })

  watchEffect(()=>{
    finishedOrders_show.value = finishedOrders_all.slice(0, showOrderNum.value);
    if(finishedOrders_show.value.length === finishedOrders_all.length){
      isAllOrders.value = true
    }else{
      isAllOrders.value = false
    }
  })
}

onMounted(async ()=>{
  if(!status) {
    const alertMessage = {
      replacePath: '/account/login',
      confirmButtonText:'前往登入'
    }
    if (errorMessage) {
      alertDialog.value.showErrorMessage({ 
        message: errorMessage, ...alertMessage  })
    }else{
      alertDialog.value.showErrorMessage(alertMessage)
    }
  }
})

const addOrderNum = () => {
  showOrderNum.value += addOderNum;
}

let deleteOrderId = '';
const setDeleteId = (orderId) => {
  deleteOrderId = orderId;
}

const cancelOrder = async () => {
  isLoading.value = true
  confirmModal.value.hide();
  
  const { status, message: errorMessage } = await deleteOrder(deleteOrderId, token)
  
  isLoading.value = false;
  if(!status) {
    if (errorMessage) {
      alertDialog.value.showErrorMessage({message: errorMessage})
    }else{
      alertDialog.value.showErrorMessage()
    }
    return
  }
  alertDialog.value.showSuccessMessage({title: '已取消預定！', message: '', reloadPage: true})
}

</script>

<template>
  <AppAlert ref="alertDialog" />
  <RoomsBookingLoading v-if="isLoading" />
  <ClientOnly>
    <div class="row gap-6 gap-md-0" v-if="orderList.length">
      <div class="col-12 col-md-7 flex-fill" v-if="comingOrders.length">
        <div class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-4 p-md-10 bg-neutral-0" style="max-width: 730px;">
          <template v-for="(order, index) in comingOrders" :key="order._id">
            <div>
              <p class="mb-2 text-neutral-80 fs-8 fs-md-7 fw-medium">
                {{ `預訂參考編號： ${orderList[0]._id}` }}
              </p>
              <h2 class="mb-0 text-neutral-100 fs-7 fs-md-5 fw-bold">
                即將來的行程
              </h2>
            </div>

            <img class="img-fluid rounded-3" :src="order.roomId.imageUrl" :alt="order.roomId.name">

            <section class="d-flex flex-column gap-6">
              <h3 class="d-flex align-items-center mb-0 text-neutral-80 fs-8 fs-md-6 fw-bold">
                <p class="mb-0">
                  {{ `${order.roomId.name}，${order.dayCount} 晚` }}
                </p>
                <span class="d-inline-block mx-4 bg-neutral-80" style="width: 1px;height: 18px;" />
                <p class="mb-0">
                  {{ `住宿人數：${order.peopleNum} 位` }}
                </p>
              </h3>

              <div class="text-neutral-80 fs-8 fs-md-7 fw-bold">
                <p class="title-deco mb-2">
                  入住：<span v-dayFormat="order.checkInDate"></span>，15:00 可入住
                </p>
                <p class="title-deco mb-0">
                  退房：<span v-dayFormat="order.checkOutDate"></span>，12:00 前退房
                </p>
              </div>

              <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-bold">
                {{ `NT$ ${formatNumber(order.roomId.price * order.dayCount)}` }}
              </p>
            </section>

            <hr class="my-0 opacity-100 text-neutral-40">

            <section>
              <h3 class="title-deco mb-6 text-neutral-100 fs-8 fs-md-7 fw-bold">
                房內設備
              </h3>
              <ul
                class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 border border-neutral-40 rounded-3 list-unstyled">
                <template v-for="(facility, index) in order.roomId.facilityInfo" :key="`facility-${index}`">
                  <li class="flex-item d-flex gap-2" v-if="facility.isProvide">
                    <Icon class="fs-5 text-primary-100" icon="material-symbols:check" />
                    <p class="mb-0 text-neutral-80 fw-bold">
                      {{ facility.title }}
                    </p>
                  </li>
                </template>
              </ul>
            </section>

            <section>
              <h3 class="title-deco mb-6 text-neutral-100 fs-8 fs-md-7 fw-bold">
                備品提供
              </h3>
              <ul
                class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 border border-neutral-40 rounded-3 list-unstyled">
                <template v-for="(amenity, index) in order.roomId.amenityInfo" :key="`amenity-${index}`">
                  <li class="flex-item d-flex gap-2" v-if="amenity.isProvide">
                    <Icon class="fs-5 text-primary-100" icon="material-symbols:check" />
                    <p class="mb-0 text-neutral-80 fw-bold">
                      {{ amenity.title }}
                    </p>
                  </li>
                </template>
              </ul>
            </section>

            <div class="d-flex gap-4">
              <button data-bs-toggle="modal" data-bs-target="#cancelModal"
                class="btn btn-outline-primary-100 w-50 py-4 fw-bold" style="--bs-btn-hover-color: #fff" type="button"
                @click="setDeleteId(order._id)">
                取消預訂
              </button>
              <NuxtLink :to="{
                name: 'rooms-roomId',
                params: {
                  roomId: order.roomId._id
                }
              }" class="btn btn-primary-100 text-neutral-0 w-50 py-4 fw-bold" type="button">
                查看詳情
              </NuxtLink>
            </div>
            <hr class="my-0 opacity-100 text-neutral-40" v-if="index < comingOrders.length - 1">
          </template>
        </div>
      </div>
      <div class="col-12 col-md-5 flex-fill" v-if=finishedOrders_show.length>
        <div class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-4 p-md-10 bg-neutral-0">
          <h2 class="mb-0 text-neutral-100 fs-7 fs-md-5 fw-bold">
            歷史訂單
          </h2>

          <template v-for="(order, index) in finishedOrders_show" :key="order._id">
            <div class="d-flex flex-column flex-lg-row gap-6">
              <img class="img-fluid object-fit-cover rounded-3" style="max-width: 120px; height: 80px;"
                :src="order.roomId.imageUrl" :alt="order.roomId.name">
              <section class="d-flex flex-column gap-4">
                <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-medium">
                  {{ `預訂參考編號： ${order._id}` }}
                </p>

                <h3 class="d-flex align-items-center mb-0 text-neutral-80 fs-8 fs-md-6 fw-bold">
                  {{ order.roomId.name }}
                </h3>

                <div class="text-neutral-80 fw-medium">
                  <p class="mb-2">
                    {{ `住宿天數： ${order.dayCount} 晚` }}
                  </p>
                  <p class="mb-0">
                    {{ `住宿人數：${order.peopleNum} 位` }}
                  </p>
                </div>

                <div class="text-neutral-80 fs-8 fs-md-7 fw-medium">
                  <p class="title-deco mb-2">
                    入住：<span v-dayFormat="order.checkInDate"></span>，15:00 可入住
                  </p>
                  <p class="title-deco mb-0">
                    退房：<span v-dayFormat="order.checkOutDate"></span>，12:00 前退房
                  </p>
                </div>
                <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-bold">
                  {{ `NT$ ${formatNumber(order.roomId.price * order.dayCount)}` }}
                </p>
              </section>

            </div>

            <hr class="my-0 opacity-100 text-neutral-40" v-if="index < finishedOrders_show.length - 1">
          </template>

          <button class="btn btn-outline-primary-100 py-4 fw-bold" style="--bs-btn-hover-color: #fff" type="button"
            @click="addOrderNum" v-if="!isAllOrders">
            查看更多
          </button>
        </div>
      </div>
    </div>
    <div class="rounded-3xl p-4 p-md-10 bg-neutral-0" v-else>
      <p>尚無預訂</p>
      <NuxtLink to="/rooms" class="btn btn-primary-100 text-neutral-0 w-50 py-4 fw-bold" type="button">
        前往訂房
      </NuxtLink>
    </div>
  </ClientOnly>


  <div id="cancelModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered align-items-end align-items-md-center m-0 mx-md-auto h-100">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body mx-auto my-10 my-md-15 text-neutral-80 fs-8 fs-md-6 fw-bold">
          確定要取消此房型的預訂嗎？
        </div>
        <div class="modal-footer d-flex gap-4">
          <button type="button" class="btn btn-outline-primary-100 flex-grow-1 m-0 py-4 fw-bold"
            style="--bs-btn-hover-color: #fff" data-bs-dismiss="modal">
            關閉視窗
          </button>
          <button type="button" class="btn btn-primary-100 flex-grow-1 m-0 py-4 text-white fw-bold"
            @click="cancelOrder">確定取消 </button>
        </div>
      </div>
    </div>
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


.rounded-3xl {
  border-radius: 1.25rem;
}

.title-deco {
  display: flex;
  align-items: center;
}

.title-deco::before {
  --color: #BF9D7D;
  content: '';
  display: inline-block;
  width: 4px;
  height: 24px;
  background-color: var(--color);
  border-radius: 10px;
  margin-right: 0.75rem;
}

.title-deco:nth-child(2)::before {
  --color: #909090;
}

.flex-item {
  max-width: 97px;
  width: 100%;
  white-space: nowrap;
}


.modal {
  backdrop-filter: blur(10px);

  @include media-breakpoint-down(md) {
    backdrop-filter: none;
  }
}

.modal-header {
  @include media-breakpoint-down(md) {
    border-bottom: 0 !important;
  }
}

.modal-content {
  @include media-breakpoint-down(md) {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
}
</style>