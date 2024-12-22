import { BOOKING_URL } from "./apiUrls";

export const bookingRoom = async (order: object) => {
  try {
    const response = await $fetch(BOOKING_URL, {
      method: "post",
      body: { ...order },
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
