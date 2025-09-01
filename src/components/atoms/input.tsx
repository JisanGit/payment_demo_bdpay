import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { FormLabel, TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";
import clsx from "clsx";
import { FormikProps } from "formik";
import React, { useState } from "react";
import { getNestedErrors, getNestedValue } from "src/utils/functions/common";

interface IPropsInput {
  label?: string;
  regex?: RegExp;
  name: string;
  formik?: FormikProps<any>;
  requiredMark?: boolean;
}

const InputStyled = styled("div")({
  width: "100%",
  fontSize: "var(--f14)",
  input: {
    backgroundColor: "var(--white)",
    padding: 10,
    height: 18,
    fontSize: "inherit",
  },
  textarea: {
    fontSize: "inherit",
  },

  ".eye_icon": {
    cursor: "pointer",
    padding: 4,
    lineHeight: 1,
    position: "absolute",
    top: "50%",
    right: 6,
    transform: "translateY(-50%)",
    svg: {
      fontSize: "1.5em",
    },
  },
  ".MuiTextField-root": {
    width: "100%",
  },
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--border_color)",
  },
  // "&.is_checkbox": {
  //   width: "auto",
  //   color: "red",
  //   display: "flex",
  //   alignItems: "baseline",
  //   flexDirection: "row-reverse",
  //   gap: 6,
  //   label: {
  //     margin: 0,
  //   },
  //   input: {
  //     display: "inline",
  //   },
  //   ".inputField_wrap": {
  //     flexShrink: 0,
  //   },
  //   ".MuiOutlinedInput-notchedOutline": {
  //     cursor: "pointer",
  //     border: "none",
  //   },
  // },
  ".MuiInputBase-root": {
    fontSize: "inherit",
    "&.MuiInputBase-multiline": {
      backgroundColor: "var(--white)",
      padding: 10,
    },
    "&.Mui-disabled": {
      color: "inherit",
      input: {
        "&.Mui-disabled": {
          "-webkit-text-fill-color": "inherit",
        },
        "&::placeholder": {
          color: "var(--text_color)",
        },
      },
      ".MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--border_color)",
      },
    },
    "&.Mui-focused": {
      ".MuiOutlinedInput-notchedOutline": {
        borderWidth: 1,
      },
    },
  },
});

const InputField: React.FC<IPropsInput & TextFieldProps> = ({
  regex,
  formik,
  name,
  label,
  requiredMark,
  ...rest
}) => {
  const [localType, setLocalType] = useState(rest?.type);
  // const formikValue = formik?.values[name];
  const formikValue = getNestedValue(formik?.values, name);
  const hasError = !!(
    getNestedErrors(formik?.errors, name) &&
    getNestedErrors(formik?.touched, name)
  );
  const formikError = hasError ? getNestedErrors(formik.errors, name) : null;

  const togglePasswordEye = () => {
    setLocalType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <InputStyled className={clsx(rest.className)}>
      {label && (
        <FormLabel className="form_label" htmlFor={name}>
          {label}
          {requiredMark && <sup>*</sup>}
        </FormLabel>
      )}
      <div className="inputField_wrap">
        <TextField
          id={name}
          name={name}
          onChange={(e) => {
            const value = e.target.value.trimStart();
            if (formik && (!regex || !value || regex?.test(value))) {
              formik.setFieldValue(name, value);
            }
          }}
          value={formikValue}
          error={hasError}
          {...rest}
          className=""
          type={localType}
        />
        {rest.type === "password" ? (
          <span className="eye_icon" onClick={togglePasswordEye}>
            {localType === "password" ? (
              <VisibilityIcon />
            ) : (
              <VisibilityOffIcon />
            )}
          </span>
        ) : null}
        {typeof formikError == "string" ? (
          <span className="field_error">{formikError}</span>
        ) : null}
      </div>
    </InputStyled>
  );
};

export default InputField;
