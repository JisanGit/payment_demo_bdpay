import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { GiSandsOfTime } from "react-icons/gi";
import { TbCancel } from "react-icons/tb";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import CustomButton from "src/components/atoms/button";
import InputField from "src/components/atoms/input";
import Logo from "src/components/logo";
import { useApi, useFetch } from "src/hooks/apiCalls";
import { authLoginYupSchema } from "src/validations/user";
import styles from "./authentication.module.scss";
import { BeatLoader } from "react-spinners";
import moment from "moment";
import clsx from "clsx";

const UserAuthentications = () => {
  console.log("working");
  //const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [numberSended, setNumberSended] = useState(false);

  const [counter, setCounter] = useState("");
  const [requestTimes, setRequestTimes] = useState(null);

  const [status, setStatus] = useState<
    "pending" | "rejected" | "success" | "expired"
  >("pending");
  const [clientToken, setClientToken] = useState("");
  let timer = null;

  const [sendCodeCall, { loading }] = useApi(
    "/authentications/authenticate_account",
    {
      method: "POST",
    }
  );

  const [cancelReqCall, { loading: loadingCancelReq }] = useApi(
    "/authentications/cancel_authentication",
    {
      method: "POST",
    }
  );

  const { data: initStatusResponse, isValidating: loadingInitStatus } =
    useFetch("/authentications/check_status", {
      params: {
        unique_id: searchParams.get("unique_id"),
      },
    });

  const [checkStatusCall, { response: statusResponse }] = useApi(
    "/authentications/check_status",
    {
      params: {
        unique_id: searchParams.get("unique_id"),
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: () => authLoginYupSchema(formik.values.email),
    onSubmit: async (values) => {
      const res = await sendCodeCall({
        customer: { unique_id: searchParams.get("unique_id"), ...values },
      });
      if (res.success) {
        setClientToken(searchParams.get("unique_id"));
        checkStatusCall();
        setNumberSended(true);
      } else {
        toast.error(res?.message);
      }
    },
  });

  const handleCancelRequest = async () => {
    const res = await cancelReqCall({
      customer: {
        unique_id: clientToken,
      },
    });
    if (res?.success) {
      window.location.replace(res?.data?.uri);
      clearInterval(timer);
    } else if (res?.status == 422) {
      window.location.reload();
    } else {
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    if (numberSended && status === "pending") {
      timer = setInterval(() => {
        checkStatusCall();
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [numberSended, statusResponse]);

  useEffect(() => {
    if (statusResponse) {
      const resStatus = statusResponse?.data?.request_status;
      if (!requestTimes) {
        setRequestTimes({
          currentTime: statusResponse?.data?.timer_start_at,
          endTime: statusResponse?.data?.timer_end_at,
        });
      }
      setStatus(resStatus);
      if (resStatus === "success") {
        window.location.replace(statusResponse?.data?.uri);
      }
    }
  }, [statusResponse]);

  useEffect(() => {
    if (initStatusResponse) {
      const resStatus = initStatusResponse?.data?.request_status;
      setStatus(resStatus);
      if (initStatusResponse?.data?.correct_otp_number) {
        setNumberSended(true);
        setRequestTimes({
          currentTime: initStatusResponse?.data?.timer_start_at,
          endTime: initStatusResponse?.data?.timer_end_at,
        });
      }
    }
  }, [initStatusResponse]);

  useEffect(() => {
    if (requestTimes) {
      const currentTime = moment(requestTimes.currentTime);
      const endTime = moment(requestTimes.endTime);
      const timer = setInterval(() => {
        if (currentTime.isBefore(endTime)) {
          const diff = moment.duration(endTime.diff(currentTime));
          const minutes = Math.floor(diff.asMinutes());
          const seconds = diff.seconds();
          setCounter(`${minutes}:${seconds.toString().padStart(2, "0")}`);
          requestTimes.currentTime = currentTime
            .add(1, "seconds")
            .toISOString();
        } else {
          setStatus("expired");
          setCounter("00:00");
          clearInterval(timer);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [requestTimes]);

  return (
    <div className={styles.authLayout}>
      <div className={styles.auth_content}>
        <div className={styles.auth_head}>
          <Logo fontSize={10} color="white" sx={{ justifyContent: "center" }} />
          <h4>{numberSended ? "Confirm your login" : "Login to BD Pass"} </h4>
        </div>
        {loadingInitStatus ? (
          <div className={styles.loading_view}>
            <BeatLoader size={22} color="var(--primary)" />
          </div>
        ) : status === "expired" ? (
          <div className={styles.expired_view}>
            <h4>Your request is expired</h4>
          </div>
        ) : status === "rejected" ? (
          <div className={styles.expired_view}>
            <h4>Your request is rejected</h4>
          </div>
        ) : !numberSended ? (
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.field_wrapper}>
              <InputField
                formik={formik}
                name="email"
                label="Email/NID/Phone"
                placeholder="Enter Email/NID/Phone"
              />
            </div>
            <div className={styles.btns_wrap}>
              <CustomButton
                type="submit"
                loading={loading}
                className={styles.submit_btn}
                variant="contained"
              >
                Login
              </CustomButton>
            </div>
            <div className={styles.create_acc}>
              Don't have an account <Link to="">Create new account</Link>
            </div>
          </form>
        ) : (
          <div className={styles.confirm_view}>
            <p>
              Open your BD Pass app, select the number shown and confirm to
              login
            </p>
            <h4 className={styles.confirm_code}>
              {statusResponse?.data?.correct_otp_number ??
                initStatusResponse?.data?.correct_otp_number}
            </h4>
            <p className={styles.status_wait}>
              <GiSandsOfTime /> Waiting for approval
            </p>

            <p className={clsx(styles.counter, counter ? styles.show : null)}>
              Expires in <b>{counter}</b>
            </p>
            <div className={styles.cancel_btn}>
              <CustomButton
                variant="text"
                color="error"
                startIcon={<TbCancel />}
                onClick={handleCancelRequest}
                loading={loadingCancelReq}
              >
                Cancel request
              </CustomButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAuthentications;
