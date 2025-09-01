import * as yup from "yup";
import { phoneSchema } from ".";
import { numberRegExp } from "src/utils/constants/regex";

export const paymentStep1Schema = yup.object().shape({
  ewallet_number: phoneSchema,
});
export const paymentStep2Schema = yup.object().shape({
  otp: yup
    .string()
    .trim()
    .min(6, "Enter 6 digits")
    .max(6, "Enter 6 digits")
    .matches(numberRegExp, "Only numbers allowed")
    .required("OTP is required"),
});
export const paymentStep3Schema = yup.object().shape({
  tpin: yup
    .string()
    .trim()
    .min(4, "Enter 4 digits")
    .max(4, "Enter 4 digits")
    .matches(numberRegExp, "Only numbers allowed")
    .required("OTP is required"),
});
