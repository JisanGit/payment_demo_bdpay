import { Box, Container } from "@mui/material";
import clsx from "clsx";
import { useFormik } from "formik";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SquareLoader } from "react-spinners";
import { toast } from "sonner";
import { useApi, useFetch } from "src/hooks/apiCalls";
import PaymentLayout from "src/layouts/paymentLayout";
import {
  paymentStep1Schema,
  paymentStep2Schema,
  paymentStep3Schema,
} from "src/validations/paymentValidations";
import styles from "./payment.module.scss";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const requestID = searchParams.get("request_id");

  const {
    data: response,
    error,
    isValidating: loading,
  } = useFetch(
    requestID ? `/web/payments_page/verify_request?request_id=${requestID}` : ""
  );
  const detailData = response?.data;

  const [verifyCustomerCall, { loading: loadingCheckPhone }] = useApi(
    "/web/payments_page/verify_ewallet_customer",
    {
      method: "POST",
    }
  );
  const [verifyOtpCall, { loading: loadingOtp }] = useApi(
    "/web/payments_page/verify_otp",
    {
      method: "POST",
    }
  );
  const [verifyTpinCall, { loading: loadingTpin }] = useApi(
    "/web/payments_page/verify_tpin",
    {
      method: "POST",
    }
  );

  const [cancelRequestCall, { loading: loadingCancel }] = useApi(
    "/web/payments_page/cancel_transaction",
    {
      method: "PUT",
    }
  );

  const total_steps = 3;
  const [activeStep, setActiveStep] = useState(1);

  const formik1 = useFormik({
    initialValues: {
      ewallet_number: "",
      sms_on_phone: "in_app",
    },
    validationSchema: paymentStep1Schema,
    onSubmit: () => {
      handleVerifyCustomer();
    },
  });

  const formik2 = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: paymentStep2Schema,
    onSubmit: async (values) => {
      const res = await verifyOtpCall({
        request_id: requestID,
        ...values,
      });
      if (res?.success) {
        setActiveStep(3);
      } else {
        toast.error(res?.error_message);
      }
    },
  });
  const formik3 = useFormik({
    initialValues: {
      tpin: "",
    },
    validationSchema: paymentStep3Schema,
    onSubmit: async (values) => {
      const res = await verifyTpinCall({
        request_id: requestID,
        ...values,
      });
      if (res?.success) {
        window.location.replace(res?.data?.callback_url);
        // setActiveStep(4);
        // setTimeout(() => {
        //   window.open(res?.data?.callback_url, "_blank");
        // }, 3000);
      } else {
        toast.error(res?.error_message);
      }
    },
  });
  const handleVerifyCustomer = async () => {
    const res = await verifyCustomerCall({
      request_id: requestID,
      ...formik1.values,
      sms_on_phone: formik1.values.sms_on_phone === "sms" ? true : false,
    });
    if (res?.success) {
      setActiveStep(2);
    } else {
      toast.error(res?.error_message);
    }
  };

  const handleCancel = async () => {
    const res = await cancelRequestCall({ request_id: requestID });
    if (res?.success) {
      formik1.resetForm();
      formik2.resetForm();
      formik3.resetForm();
      window.location.replace(res?.data?.callback_url);
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
            {!error && requestID ? (
              <div className={styles.steps}>
                {Array.from({ length: total_steps }).map((_item, index) => (
                  <div
                    className={clsx(
                      styles.step,
                      index <= activeStep - 1 ? styles.active : ""
                    )}
                    key={index}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            ) : null}
            <div className={styles.box_container}>
              <div className={styles.payment_form}>
                <div className={styles.logo_wrap}>
                  <div className={styles.logo}>
                    <img src="/images/logo.svg" alt="" />
                  </div>
                </div>
                {/* {activeStep === 4 && (
                  <div
                    className={clsx(styles.single_content, styles.success_box)}
                  >
                    <div className={clsx(styles.payment_icon, styles.success)}>
                      <FaCheckCircle />
                    </div>
                    <h4>Payment Successful</h4>
                  </div>
                )} */}
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
                    {activeStep === 1 && (
                      <div className={styles.single_content}>
                        <Step1
                          formik={formik1}
                          loadingSubmit={loadingCheckPhone}
                        />
                      </div>
                    )}
                    {activeStep === 2 && (
                      <div className={styles.single_content}>
                        <Step2
                          formik={formik2}
                          handleCancel={handleCancel}
                          loadingCancel={loadingCancel}
                          loadingSubmit={loadingOtp}
                        />
                      </div>
                    )}
                    {activeStep === 3 && (
                      <div className={styles.single_content}>
                        <Step3
                          formik={formik3}
                          handleCancel={handleCancel}
                          loadingCancel={loadingCancel}
                          loadingSubmit={loadingTpin}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className={styles.error_card}>
                    {error?.status_message ??
                      error?.message ??
                      "Invalid payment"}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>
      )}
    </PaymentLayout>
  );
};

export default Payment;
