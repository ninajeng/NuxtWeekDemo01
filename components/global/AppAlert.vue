<script setup>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const successDefaultText = {
  title: '操作成功',
  message: ''
}
const errorDefaultText = {
  title: '操作失敗',
  message: '請稍後再試'
}
const buttonDefaultText = {
  confirm: '確認'
}

const alertDialog = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-primary-100 text-white",
    cancelButton: "btn btn-neutral-40",
    timerProgressBar: "bg-primary-100"
  },
  confirmButtonText: '確認',
  cancelButtonText: '取消',
  timerProgressBar: true,
  allowOutsideClick: false
})

function showSuccessMessage ({title, message, showCancelButton, confirmButtonText, timer, replacePath = null} = {}) {
  alertDialog.fire({
    title: title || successDefaultText.title,
    text: message || successDefaultText.message,
    icon: 'success',
    showCancelButton: showCancelButton || false,
    confirmButtonText: confirmButtonText || buttonDefaultText.confirm,
    timer: timer || 0,
  }).then(async({isConfirmed, dismiss}) => {
    if(!replacePath) return;
    if(isConfirmed || dismiss === 'timer'){
      await navigateTo(replacePath);
    }
  })
}

function showErrorMessage ({title, message, showCancelButton, confirmButtonText, timer, replacePath = null} = {}) {
  alertDialog.fire({
    title: title || errorDefaultText.title,
    text: message || errorDefaultText.message,
    icon: 'warning',
    showCancelButton: showCancelButton || false,
    confirmButtonText: confirmButtonText || buttonDefaultText.confirm,
    timer: timer || 0,
  }).then(async({isConfirmed, dismiss}) => {
    if(!replacePath) return;
    if(isConfirmed || dismiss === 'timer'){
      await navigateTo(replacePath);
    }
  })
}

defineExpose({
  showSuccessMessage,
  showErrorMessage
});
</script>

<template>
  <div></div>
</template>

<style scoped></style>