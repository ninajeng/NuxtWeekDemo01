import { ORDER_LIST_URL } from "./apiUrls";

export const getOrderList = async (token: string) => {
  try {
    const response = await $fetch(ORDER_LIST_URL, {
      headers: {
        authorization: token,
      },
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
