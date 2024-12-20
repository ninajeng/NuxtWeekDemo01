import type { TRooms } from "@/types";
import { ROOM_LIST_URL } from "./apiUrls";

export const getRoomList = () => {
  return useAsyncData("roomList", () => $fetch<TRooms>(ROOM_LIST_URL), {
    transform: (response: TRooms) => {
      const { result } = response;
      result.forEach((room, index) => {
        result[index].images = [room.imageUrl, ...room.imageUrlList];
      });
      return result;
    },
  });
};
