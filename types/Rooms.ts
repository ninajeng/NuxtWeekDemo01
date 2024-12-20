type TRoomInfo = {
  title: string;
  isProvide: boolean;
};

export type TRoomResult = {
  _id: string;
  name: string;
  description: string;
  images?: string[];
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status: number;
  layoutInfo: TRoomInfo[];
  facilityInfo: TRoomInfo[];
  amenityInfo: TRoomInfo[];
  createdAt: string;
  updatedAt: string;
};

export type TRooms = {
  status: boolean;
  result: TRoomResult[];
};
