import { FormikProps } from "formik";
import { FC } from "react";
import CustomButton from "src/components/atoms/button";
import InputField from "src/components/atoms/input";
import styles from "../payment.module.scss";
import { numberRegExp } from "src/utils/constants/regex";

interface IProps {
  formik: FormikProps<any>;
  handleCancel: () => void;
  loadingCancel: boolean;
  loadingSubmit: boolean;
}

const Step3: FC<IProps> = ({
  formik,
  handleCancel,
  loadingCancel,
  loadingSubmit,
}) => {
  return (
    <form onSubmit={formik.handleSubmit} className={styles.step_form}>
      <div className={styles.form_fields}>
        <InputField
          regex={numberRegExp}
          type="password"
          label="T-PIN"
          formik={formik}
          name="tpin"
          placeholder="Enter T-Pin"
        />
      </div>
      <div className={styles.submit_btn}>
        <CustomButton
          variant="outlined"
          onClick={handleCancel}
          loading={loadingCancel}
        >
          Cancel
        </CustomButton>
        <CustomButton type="submit" loading={loadingSubmit}>
          Submit
        </CustomButton>
      </div>
    </form>
  );
};

export default Step3;
