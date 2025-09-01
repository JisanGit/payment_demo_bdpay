export const USER_TYPE: string = import.meta.env.VITE_USER_TYPE;
export const IS_PAYMENT = USER_TYPE === "PAYMENT";
export const IS_DEMO = USER_TYPE === "DEMO";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// =========== Demo temp login app key and secret ============
export const MERCHANT_APP_KEY = "sessionAppKey";
export const MERCHANT_SECRET_KEY = "sessionSecretKey";
