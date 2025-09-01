import Cookie from "js-cookie";
import { MERCHANT_APP_KEY, MERCHANT_SECRET_KEY } from "../constants";

export const getAppKey = () => {
  return Cookie.get(MERCHANT_APP_KEY);
};
export const getSecretKey = () => {
  return Cookie.get(MERCHANT_SECRET_KEY);
};

export const storeToken = async (data: any) => {
  Cookie.set(MERCHANT_APP_KEY, data?.app_key, {
    secure: false,
    expires: 0.5,
  });
  Cookie.set(MERCHANT_SECRET_KEY, data?.secret_key, {
    secure: false,
    expires: 0.5,
  });
};
export const clearToken = () => {
  Cookie.remove(MERCHANT_APP_KEY);
  Cookie.remove(MERCHANT_SECRET_KEY);
};

export const isAuthenticated = () => {
  const app_key = getAppKey();
  const secret_key = getSecretKey();
  return (
    !!app_key &&
    app_key !== "undefined" &&
    !!secret_key &&
    secret_key !== "undefined"
  );
};
