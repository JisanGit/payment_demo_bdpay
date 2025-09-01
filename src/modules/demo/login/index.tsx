import { Container } from "@mui/material";
import InputField from "src/components/atoms/input";
import * as yup from "yup";
import styles from "./login.module.scss";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomButton from "src/components/atoms/button";
import { useApi } from "src/hooks/apiCalls";
import { useStore } from "src/store";
import { storeToken } from "src/utils/functions/auth";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useStore((state: any) => state);
  const [checkKeysCall, { loading }] = useApi("/tokenized/checkout/login", {
    method: "POST",
  });

  const formik = useFormik({
    initialValues: {
      "x-app-key": "",
      "x-secret-key": "",
    },
    validationSchema: yup.object().shape({
      "x-app-key": yup.string().trim().required("App key is required"),
      "x-secret-key": yup.string().trim().required("Secret key is required"),
    }),
    onSubmit: async (values) => {
      const res = await checkKeysCall(values);
      if (res?.success) {
        storeToken(res);
        setIsLogin(res);
        navigate("/");
        toast.success(res?.status_message);
      } else {
        toast.error(res?.error_message);
      }
    },
  });
  return (
    <div className={styles.login_page}>
      <Container>
        <div className={styles.login_inner}>
          <div className={styles.image_wrap}>
            <div className={styles.image}>
              <img src="/images/login.svg" alt="" />
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className={styles.form_box}>
            <h4>Enter key to continue</h4>
            <div className={styles.fields_wrap}>
              <InputField
                label="App key"
                formik={formik}
                name="x-app-key"
                placeholder="Enter app key"
              />
              <InputField
                label="Secret key"
                formik={formik}
                name="x-secret-key"
                placeholder="Enter secret key"
              />
              <div className={styles.submit_btn}>
                <CustomButton type="submit" color="info" loading={loading}>
                  Submit
                </CustomButton>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
