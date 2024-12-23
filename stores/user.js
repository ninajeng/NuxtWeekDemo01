import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref({});
  const userName = ref("");
  const userId = ref("");

  const setUserInfo = (info = {}) => {
    userInfo.value = info;
  };

  watchEffect(() => {
    userName.value = userInfo.value.name;
    userId.value = userInfo.value._id;
  });

  return {
    setUserInfo,
    userInfo,
    userName,
    userId,
  };
});
