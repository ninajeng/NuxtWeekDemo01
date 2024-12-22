import { defineStore } from "pinia";

export const useBookingStore = defineStore("booking", () => {
  const bookingBackup = ref({});

  const setBookingBackup = (data = {}) => {
    bookingBackup.value = data;
  };

  return {
    bookingBackup,
    setBookingBackup,
  };
});
