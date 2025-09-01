import {
  FormControl,
  FormLabel,
  InputLabel,
  InputLabelProps,
  MenuItem,
  MenuItemProps,
  Select,
  SelectProps,
} from "@mui/material";
// import { styled } from "@mui/system";
import clsx from "clsx";
import { FormikProps } from "formik";
import React, { ReactNode } from "react";
import styles from "./atoms.module.scss";
import { getNestedErrors, getNestedValue } from "src/utils/functions/common";

interface IOption extends MenuItemProps {
  name: string;
  value?: string | number;
  icon?: ReactNode;
}
interface IPropsMenu {
  options: IOption[];
  name: string;
  formik?: FormikProps<any>;
  minWidth?: number;
  label?: string;
  formLabel?: string;
  labelBg?: string;
  labelProps?: InputLabelProps;
  requiredMark?: boolean;
}

const SelectMenu: React.FC<IPropsMenu & SelectProps> = ({
  options,
  name,
  formik,
  label,
  formLabel,
  minWidth = 80,
  labelProps,
  labelBg = "var(--white)",
  requiredMark,
  ...rest
}) => {
  const formikValue = getNestedValue(formik?.values, name);
  const hasError = !!(
    getNestedErrors(formik?.errors, name) &&
    getNestedErrors(formik?.touched, name)
  );
  const formikError = hasError ? getNestedErrors(formik.errors, name) : null;
  return (
    <div>
      <FormControl
        sx={{
          width: "100%",
          justifyContent: formLabel ? "flex-end" : "initial",
          ".MuiInputLabel-root": {
            backgroundColor: labelBg,
            fontSize: "inherit",
          },
          ".MuiSelect-select": {
            opacity: formikValue || rest?.value ? 1 : 0.5,
          },
          ".MuiFormLabel-root": {
            display: "block",
            fontSize: "inherit",
            color: "var(--heading_color)",
            marginBottom: "4px",
            lineHeight: "1.4375em",
          },
        }}
        className={clsx(styles.select_root, rest.className)}
      >
        {formLabel && (
          <FormLabel className="form_label">
            {formLabel}
            {requiredMark && <sup>*</sup>}
          </FormLabel>
        )}
        {label ? <InputLabel {...labelProps}>{label}</InputLabel> : null}
        <Select
          displayEmpty
          // className={styles.select_menu}
          MenuProps={{
            className: styles.select_menu,
          }}
          sx={{ minWidth }}
          value={formikValue}
          onChange={(e) => formik.setFieldValue(name, e.target.value)}
          {...rest}
        >
          {options.map((item) => (
            <MenuItem
              key={item.name}
              {...item}
              autoFocus={false}
              className={styles.menu_item}
            >
              {item.icon} {item.name}
            </MenuItem>
          ))}
        </Select>
        {typeof formikError == "string" ? (
          <span className="field_error">{formikError}</span>
        ) : null}
      </FormControl>
    </div>
  );
};

export default SelectMenu;
