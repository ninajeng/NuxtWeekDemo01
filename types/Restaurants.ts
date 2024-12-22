export type TRestaurantResult = {
  _id: string;
  title: string;
  description: string;
  diningTime: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type TRestaurants = {
  status: boolean;
  result: TRestaurantResult[];
};
