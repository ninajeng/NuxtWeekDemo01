import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref({});
  const userName = ref("");

  const setUserInfo = (info = {}) => {
    userInfo.value = info;
  };

  watchEffect(() => {
    userName.value = userInfo.value.name;
  });

  return {
    setUserInfo,
    userInfo,
    userName,
  };
});
