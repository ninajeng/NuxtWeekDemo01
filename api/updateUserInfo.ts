import { USERINFO_URL } from "./apiUrls";

export const updateUserInfo = async (userInfo: object, token: string) => {
  try {
    const response = await $fetch(USERINFO_URL, {
      method: "put",
      headers: {
        authorization: token,
      },
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
