import type { TRestaurants } from "@/types";
import { RESTAURANT_URL } from "./apiUrls";

export const getRestaurantList = () => {
  return useAsyncData(
    "restaurantList",
    () => $fetch<TRestaurants>(RESTAURANT_URL),
    {
      transform: (response: TRestaurants) => {
        return response.result;
      },
    }
  );
};
