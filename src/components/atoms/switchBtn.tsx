import { FormLabel, Switch, SwitchProps } from "@mui/material";
import { styled } from "@mui/system";
import { FormikProps } from "formik";
import { FC } from "react";
import { getNestedValue } from "src/utils/functions/common";

interface IPropsInput {
  label?: string;
  name: string;
  formik?: FormikProps<any>;
}

const SwitchStyled = styled("div")({});

const CustomSwitch: FC<IPropsInput & SwitchProps> = ({
  name,
  formik,
  ...rest
}) => {
  const formikValue = getNestedValue(formik?.values, name);

  return (
    <SwitchStyled>
      {rest.label && <FormLabel className="form_label">{rest.label}</FormLabel>}
      <Switch
        color="success"
        checked={formikValue}
        name={name}
        //   value={formikValue}
        onChange={formik.handleChange}
        {...rest}
      />
    </SwitchStyled>
  );
};

export default CustomSwitch;
