import { FormikProps } from "formik";
import { FC, useEffect, useState } from "react";
import CustomButton from "src/components/atoms/button";
import InputField from "src/components/atoms/input";
import styles from "../payment.module.scss";
import { numberRegExp } from "src/utils/constants/regex";
import { useApi } from "src/hooks/apiCalls";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

interface IProps {
  formik: FormikProps<any>;
  handleCancel: () => void;
  loadingCancel: boolean;
  loadingSubmit: boolean;
}

const Step2: FC<IProps> = ({
  formik,
  handleCancel,
  loadingCancel,
  loadingSubmit,
}) => {
  const [searchParams] = useSearchParams();
  const requestID = searchParams.get("request_id");
  const initialTime = 3 * 60;

  const [time, setTime] = useState(initialTime);

  const [resendOtpCall, { loading: loadingResendOtp }] = useApi(
    "/web/payments_page/regenerate_otp",
    {
      method: "POST",
    }
  );

  const handleResendOtp = async () => {
    const res = await resendOtpCall({ request_id: requestID });
    if (res?.success) {
      toast.success(res?.status_message);
      setTime(initialTime);
    } else {
      toast.error(res?.error_message);
    }
  };

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.step_form}>
      <div className={styles.form_fields}>
        <InputField
          regex={numberRegExp}
          label="OTP"
          formik={formik}
          name="otp"
          placeholder="Enter otp here"
        />
      </div>
      <div className={styles.resend_wrap}>
        {time !== 0 ? (
          <p>
            <span>Resend OTP in</span> <b>{formatTime(time)}</b>
          </p>
        ) : (
          time === 0 && (
            <CustomButton
              variant="text"
              onClick={handleResendOtp}
              loading={loadingResendOtp || loadingSubmit}
            >
              Resend OTP
            </CustomButton>
          )
        )}
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

export default Step2;
