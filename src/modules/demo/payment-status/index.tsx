import { PendingActionsRounded as PendingActionsRoundedIcon } from "@mui/icons-material";
import clsx from "clsx";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import NoData from "src/components/noDataLoader/noData";
import { useFetch } from "src/hooks/apiCalls";
import styles from "./paymentStatus.module.scss";
import { Box } from "@mui/material";
import CustomButton from "src/components/atoms/button";
import { getAppKey, getSecretKey } from "src/utils/functions/auth";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const payment_id = searchParams.get("payment_id");
  const {
    data: response,
    error,
    isLoading,
  } = useFetch(`/tokenized/checkout/execute?payment_id=${payment_id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-app-key": getAppKey(),
      "x-secret-key": getSecretKey(),
    },
  });

  const isSuccess = response?.status === "Success";
  const isRejected = response?.status === "Rejected";

  useEffect(() => {
    console.log("response", response);
    console.log("error", error);
  }, [response, error, isLoading]);

  return (
    <div>
      <div className={styles.payment_confirm_page}>
        <div className={styles.card}>
          {response && !error && !isLoading ? (
            <>
              <div
                className={clsx(
                  styles.payment_icon,
                  isSuccess
                    ? styles.success
                    : isRejected
                    ? styles.rejected
                    : styles.pending
                )}
              >
                {isSuccess ? (
                  <FaCheckCircle />
                ) : isRejected ? (
                  <IoIosCloseCircle />
                ) : (
                  <PendingActionsRoundedIcon />
                )}
              </div>
              <div className={styles.title}>
                <h4>
                  Payment{" "}
                  {isSuccess
                    ? "successful"
                    : isRejected
                    ? "Rejected"
                    : "Pending"}
                </h4>
                <p>Payment ID : {response?.payment_id}</p>
              </div>

              <div className={styles.content}>
                <h6>
                  <b>Amount : </b> <span>{response?.amount}</span>
                </h6>
                <h6>
                  <b>Order ID : </b> <span>{response?.merchant_order_id}</span>
                </h6>
              </div>
            </>
          ) : (
            <NoData
              error={error}
              loading={isLoading}
              message={error?.error_message}
              sx={{ height: "100%", minHeight: "200px", color: "var(--error)" }}
            />
          )}
          <Box
            sx={{
              display: " flex",
              justifyContent: "center",
            }}
          >
            <CustomButton
              color="info"
              onClick={() => navigate("/", { replace: true })}
            >
              Back to home
            </CustomButton>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
