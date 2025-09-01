import { Checkbox, CheckboxProps, FormGroup, FormLabel } from "@mui/material";
import { styled } from "@mui/system";
import { FormikProps } from "formik";
import { FC } from "react";
import { getNestedValue } from "src/utils/functions/common";

interface IPropsInput {
  label?: string;
  name: string;
  formik?: FormikProps<any>;
}

const CheckBoxStyled = styled(FormGroup)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  label: {
    margin: 0,
    cursor: "pointer",
  },
});

const CustomCheckbox: FC<IPropsInput & CheckboxProps> = ({
  name,
  formik,
  ...rest
}) => {
  const formikValue = getNestedValue(formik?.values, name);
  const id = `checkbox-${name}`;
  return (
    <CheckBoxStyled>
      <Checkbox
        id={id}
        name={name}
        onChange={(e) => {
          formik.setFieldValue(name, e.target.checked);
        }}
        checked={formikValue}
        {...rest}
      />
      {rest.label && (
        <FormLabel className="form_label" htmlFor={id}>
          {rest.label}
        </FormLabel>
      )}
    </CheckBoxStyled>
  );
};

export default CustomCheckbox;
