import { Box, Container } from "@mui/material";
import clsx from "clsx";
import { useFormik } from "formik";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { SquareLoader } from "react-spinners";
import { toast } from "sonner";
import CustomButton from "src/components/atoms/button";
import InputField from "src/components/atoms/input";
import { useApi, useFetch } from "src/hooks/apiCalls";
import PaymentLayout from "src/layouts/paymentLayout";
import { numberRegExp } from "src/utils/constants/regex";
import { paymentStep1Schema } from "src/validations/paymentValidations";
import styles from "./payment.module.scss";
import CustomSwitch from "src/components/atoms/switchBtn";

const PaymentWithdraw = () => {
  const [searchParams] = useSearchParams();
  const requestID = searchParams.get("request_id");

  const {
    data: response,
    error,
    isValidating: loading,
  } = useFetch(
    requestID ? `/web/payments_page/verify_request?request_id=${requestID}` : ""
  );

  const [success, setSuccess] = useState(false);

  const detailData = response?.data;

  const [verifyCustomerCall, { loading: loadingCheckPhone }] = useApi(
    "/web/payments_page/verify_payin_customer",
    {
      method: "POST",
    }
  );

  const [cancelRequestCall, { loading: loadingCancel }] = useApi(
    "/web/payments_page/cancel_transaction_payin",
    {
      method: "PUT",
    }
  );

  const formik = useFormik({
    initialValues: {
      ewallet_number: "",
    },
    validationSchema: paymentStep1Schema,
    onSubmit: async () => {
      const res = await verifyCustomerCall({
        request_id: requestID,
        ...formik.values,
      });
      if (res?.success) {
        // setSuccess(true);
        formik.resetForm();
        window.location.replace(res?.data?.callback_url);

        // setTimeout(() => {
        //   window.open(res?.data?.callback_url, "_blank");
        // }, 3000);
      } else {
        toast.error(res?.error_message);
      }
    },
  });

  const handleCancel = async () => {
    const res = await cancelRequestCall({ request_id: requestID });
    if (res?.success) {
      formik.resetForm();
      window.location.replace(res?.data?.callback_url);
      // setTimeout(() => {
      // }, 1000);
    } else {
      toast.error(res?.error_message);
    }
  };

  return (
    <PaymentLayout>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--primary)",
            position: "relative",
            zIndex: 1000,
          }}
        >
          <SquareLoader size={30} color="#fff" />
        </Box>
      ) : (
        <div className={styles.payment_page}>
          <Container>
            <div className={styles.box_container}>
              <div className={styles.payment_form}>
                <div className={styles.logo_wrap}>
                  <div className={styles.logo}>
                    <img src="/images/logo.svg" alt="" />
                  </div>
                </div>
                {success && !error && (
                  <div
                    className={clsx(styles.single_content, styles.success_box)}
                  >
                    <div className={clsx(styles.payment_icon, styles.success)}>
                      <FaCheckCircle />
                    </div>
                    <h4>Payment Successful</h4>
                  </div>
                )}
                {!error && requestID ? (
                  <>
                    <div className={styles.detail_box}>
                      <div className={styles.detail}>
                        <h6>Payment ID:</h6>
                        <p>{detailData?.payment_id}</p>
                      </div>
                      <div className={styles.detail}>
                        <h6>Amount:</h6>
                        <p>{detailData?.amount}</p>
                      </div>
                    </div>
                    {!success && (
                      <div className={styles.single_content}>
                        <form
                          onSubmit={formik.handleSubmit}
                          className={styles.step_form}
                        >
                          <div className={styles.form_fields}>
                            <InputField
                              autoFocus
                              regex={numberRegExp}
                              label="Your phone number"
                              formik={formik}
                              name="ewallet_number"
                              placeholder="Enter phone number"
                            />
                          </div>
                          <div className={styles.submit_btn}>
                            <CustomButton
                              variant="outlined"
                              loading={loadingCancel}
                              onClick={handleCancel}
                              disabled={loadingCheckPhone}
                            >
                              Cancel
                            </CustomButton>
                            <CustomButton
                              type="submit"
                              disabled={loadingCancel}
                              loading={loadingCheckPhone}
                            >
                              Submit
                            </CustomButton>
                          </div>
                        </form>
                      </div>
                    )}
                  </>
                ) : null}
                {error ? (
                  <div className={styles.error_card}>
                    {error?.status_message ??
                      error?.message ??
                      "Invalid payment"}
                  </div>
                ) : null}
              </div>
            </div>
          </Container>
        </div>
      )}
    </PaymentLayout>
  );
};

export default PaymentWithdraw;
