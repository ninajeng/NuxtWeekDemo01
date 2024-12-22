import type { TRoom } from "@/types";
import { ROOM_URL } from "./apiUrls";

export const getRoomInfo = (roomId: string) => {
  return useAsyncData("roomInfo", () => $fetch<TRoom>(`${ROOM_URL}${roomId}`), {
    transform: (response: TRoom) => {
      return response.result;
    },
  });
};
