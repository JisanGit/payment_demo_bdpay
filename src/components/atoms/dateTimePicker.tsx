import { FormLabel, styled } from "@mui/material";
// import { styled } from "@mui/system";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  DateTimePicker,
  DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { FormikProps } from "formik";
import React from "react";

interface IPropsMenu {
  name: string;
  formik?: FormikProps<any>;
  label?: string;
}

const DateTimeStyled = styled("div")({
  "& .MuiFormControl-root": {
    backgroundColor: "var(--white)",
  },
  "& .MuiInputBase-input": {
    padding: "7px 1rem",
    height: "24px",
    fontSize: "var(--f14)",
    paddingRight: 0,
  },
});

const DateTimePickerField: React.FC<
  IPropsMenu & DateTimePickerProps<any, false>
> = ({ name, label, formik, ...rest }) => {
  const formikValue = formik?.values[name];

  return (
    <DateTimeStyled>
      {label && <FormLabel className="form_label">{label}</FormLabel>}
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          name={name}
          value={formikValue}
          onChange={(newValue) => formik.setFieldValue(name, newValue)}
          disableFuture
          slotProps={{
            popper: {
              componentsProps: {
                root: { className: "custom_popper" },
              },
            },
          }}
          {...rest}
        />
      </LocalizationProvider>
    </DateTimeStyled>
  );
};

export default DateTimePickerField;
