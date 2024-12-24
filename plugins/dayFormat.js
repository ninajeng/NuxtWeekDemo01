import dayjs from "dayjs";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("dayFormat", {
    mounted(el, binding) {
      const dayAppendix = ["日", "一", "二", "三", "四", "五", "六"];
      const dayjsObj = dayjs(binding.value);
      const day = dayAppendix[dayjsObj.day()];
      el.textContent = el.textContent.replace(
        "[day]",
        dayjsObj.format(`M月D日 星期${day}`)
      );
    },
  });
});
