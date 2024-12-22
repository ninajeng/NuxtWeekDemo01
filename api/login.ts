import { LOGIN_URL } from "./apiUrls";

export const login = async (userInfo: object) => {
  try {
    const response = await $fetch(LOGIN_URL, {
      method: "post",
      body: { ...userInfo },
    });
    console.dir(response);
    return response;
  } catch (error) {
    console.dir(error);
    let message = "帳號或密碼錯誤";
    const errorRes = error as { status?: number };
    if (errorRes.status === 404) {
      message = "此用戶不存在";
    }
    return {
      status: false,
      message,
    };
    // console.dir(error);
    // const errorRes = error as {
    //   response?: {
    //     _data: { status: boolean; message: string };
    //   };
    // };
    // return errorRes.response?._data || errorRes.response;
  }
};
