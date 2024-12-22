import { SIGNUP_URL } from "./apiUrls";

export const signup = async (userInfo: object) => {
  try {
    const response = await $fetch(SIGNUP_URL, {
      method: "post",
      body: { ...userInfo },
    });
    return response;
  } catch (error) {
    const errorRes = error as {
      response?: {
        _data: { status: boolean; message: string };
      };
    };
    return errorRes.response?._data || errorRes.response;
  }
};
