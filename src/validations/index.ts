import {
  alphaNumberRegExp,
  emailRegExp,
  phoneRegExp,
} from "src/utils/constants/regex";
import * as yup from "yup";

export const emailSchema = yup
  .string()
  .trim()
  .required("Email is required")
  .email("Must be valid email syntax")
  .matches(emailRegExp, "Must be valid email syntax");

export const phoneSchema = yup
  .string()
  .trim()
  .required("Phone number is required")
  .matches(phoneRegExp, "Must be valid phone number")
  .min(10, "Minimum 10 numbers")
  .max(12, "Maximum 12 numbers");

export const passwordSchema = yup
  .string()
  .min(6, "Minimum 6 characters required")
  .trim()
  .required("Password is required");
// .matches(passwordRegExp, "Must contain 4 alphabet and 4 numbers");

export const confirmPasswordSchema = (reference: string) =>
  yup
    .string()
    .oneOf([yup.ref(reference), null], "Please match it with above password")
    .required("Confirm password is required");

export const nameSchema = (message?: string) =>
  yup
    .string()
    .trim()
    .max(24, "Maximum 24 character")
    .required(message ?? "This field is required")
    .matches(alphaNumberRegExp, "No space and special characters allowed");

export const dateSchema = (message?: string) =>
  yup.date().required(message ?? "This field is required");
