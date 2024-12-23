import { ORDER_URL } from "./apiUrls";

export const getOrderInfo = async (orderId: string, token: string) => {
  try {
    const response = await $fetch(`${ORDER_URL}/${orderId}`, {
      headers: {
        authorization: token,
      },
    });
    return response;
  } catch (error) {
    const errorRes = error as {
      status: number;
      response?: {
        _data: { status: boolean; message: string };
      };
    };
    if (errorRes.status === 403 || errorRes.status === 404) {
      return errorRes.response?._data || errorRes.response;
    } else {
      return {
        status: false,
      };
    }
  }
};
