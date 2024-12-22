import type { TEmailVerify } from "@/types";
import { EMAIL_VERIFY_URL } from "./apiUrls";

export const verifyEmail = async (email: string) => {
  try {
    const response = await $fetch<TEmailVerify>(EMAIL_VERIFY_URL, {
      method: "post",
      body: { email },
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
