import { USERINFO_URL } from "./apiUrls";

export const getUserInfo = (token: string) => {
  return useAsyncData("userInfo", () =>
    $fetch(USERINFO_URL, {
      headers: {
        authorization: token,
      },
    })
  );
};
