import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { FormikProps } from "formik";
import { FC } from "react";
import CustomButton from "src/components/atoms/button";
import InputField from "src/components/atoms/input";
import { numberRegExp } from "src/utils/constants/regex";
import styles from "../payment.module.scss";

interface IProps {
  formik: FormikProps<any>;
  loadingSubmit: boolean;
}

const Step1: FC<IProps> = ({ formik, loadingSubmit }) => {
  return (
    <form onSubmit={formik.handleSubmit} className={styles.step_form}>
      <div className={styles.form_fields}>
        <InputField
          autoFocus
          regex={numberRegExp}
          label="Your phone number"
          formik={formik}
          name="ewallet_number"
          placeholder="Enter phone number"
        />
        <div>
          <FormLabel className="form_label">SMS by</FormLabel>
          <RadioGroup
            row
            defaultValue="in_app"
            name="sms_on_phone"
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="in_app"
              control={<Radio />}
              label="In-app"
            />
            <FormControlLabel value="sms" control={<Radio />} label="SMS" />
          </RadioGroup>
        </div>
      </div>
      <div className={styles.submit_btn}>
        <CustomButton type="submit" loading={loadingSubmit}>
          Submit
        </CustomButton>
      </div>
    </form>
  );
};

export default Step1;
