import type { TNews } from "@/types";
import { NEWS_URL } from "./apiUrls";

export const getNewsList = () => {
  return useAsyncData("newsList", () => $fetch<TNews>(NEWS_URL), {
    transform: (response: TNews) => {
      return response.result;
    },
  });
};
