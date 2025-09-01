export const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// export const phoneRegExp = /^\+[0-9]*$/; // make + compulsory
export const phoneRegExp = /^\+?\d*$/;
export const numberRegExp = /^[0-9]+$/;
export const numberDecimalRegExp = /^\d+(\.\d{0,3})?$/;
export const alphaNumberRegExp = /^[a-zA-Z0-9]+$/;
export const passwordRegExp = /^(?=.*[a-zA-Z]{4,})(?=.*\d{4,}).{8,}$/;
export const usernameRegExp = /^(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
