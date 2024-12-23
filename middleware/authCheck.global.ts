import { checkLogin } from "@/api/checkLogin";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const redirectPath = "/account/login";
  const config = useRuntimeConfig();
  const cookieToken = useCookie(config.public.cookieToken);
  const token = cookieToken.value;

  const isNeedAuth = [
    "user-userId-profile",
    "user-userId-order",
    "rooms-roomId-booking",
    "booking-confirmation-bookingId",
  ];

  if (isNeedAuth.includes(to.name as string)) {
    if (!token) {
      return navigateTo(redirectPath);
    }

    const { data, error } = await checkLogin(token);
    const response = data as { value: { status: boolean } };
    if (error.value || !response.value?.status) {
      cookieToken.value = "";
      return navigateTo(redirectPath);
    }
  }
});
