import { DELETE_ORDER_URL } from "./apiUrls";

export const deleteOrder = async (orderId: string, token: string) => {
  try {
    const response = await $fetch(`${DELETE_ORDER_URL}/${orderId}`, {
      method: "delete",
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
