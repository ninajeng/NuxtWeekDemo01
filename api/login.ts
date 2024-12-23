import { LOGIN_URL } from "./apiUrls";

export const login = async (userInfo: object) => {
  try {
    const response = await $fetch(LOGIN_URL, {
      method: "post",
      body: { ...userInfo },
    });
    return response;
  } catch (error) {
    let message = "帳號或密碼錯誤";
    const errorRes = error as { status?: number };
    if (errorRes.status === 404) {
      message = "此用戶不存在";
    }
    return {
      status: false,
      message,
    };
  }
};
