import { CHECK_LOGIN_URL } from "./apiUrls";

export const checkLogin = (token: string) => {
  return useAsyncData("checkLogin", () =>
    $fetch(CHECK_LOGIN_URL, {
      headers: {
        authorization: token,
      },
    })
  );
};
