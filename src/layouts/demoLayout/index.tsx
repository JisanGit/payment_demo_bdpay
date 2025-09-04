import { Container, IconButton } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { PiHandWithdraw } from "react-icons/pi";
import { toast } from "sonner";
import CustomButton from "src/components/atoms/button";
import CustomDrawer from "src/components/atoms/drawer";
import InputField from "src/components/atoms/input";
import CustomModal from "src/components/atoms/modal";
import CartCard from "src/components/cards/cartCard";
import { useApi } from "src/hooks/apiCalls";
import useToggle from "src/hooks/useToggle";
import { useStore } from "src/store";
import { numberRegExp } from "src/utils/constants/regex";
import { generateId } from "src/utils/functions/common";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { clearToken, getAppKey, getSecretKey } from "src/utils/functions/auth";
import styles from "./demoLayout.module.scss";

const DemoLayout = ({ children }) => {
  const navigate = useNavigate();
  const { cartList, setIsLogin, isLogin } = useStore((state: any) => state);

  const [paymentCall, { loading }] = useApi(
    "/tokenized/checkout/initiate_payment",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-key": getAppKey(),
        "x-secret-key": getSecretKey(),
      },
    }
  );

  const [withdrawPaymentCall, { loading: loadingWithdrawAmount }] = useApi(
    "/tokenized/checkout/initiate_payin_payment",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-key": getAppKey(),
        "x-secret-key": getSecretKey(),
      },
    }
  );

  const { open, isOpen, close } = useToggle();
  const {
    open: openModal,
    isOpen: isOpenModal,
    close: closeModal,
  } = useToggle();
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: yup.object().shape({
      amount: yup
        .number()
        .required("Amount is required")
        .typeError("Only number allowed")
        .min(1, "Add minimum 1 in amount")
        .max(10000000, "Maximum 10000000 in amount"),
    }),
    onSubmit: async (values) => {
      const order_id = generateId();
      const res = await withdrawPaymentCall({
        amount: values.amount,
        transaction_type: "payin",
        currency: "BDT",
        merchant_order_id: order_id,
        callback_url: `${window.location.origin}/payment-status`,
      });
      if (res?.success) {
        window.open(res?.bdpay_url, "_blank");
        window.location.reload();
      } else {
        toast.error(res?.error_message);
      }
    },
  });
  const handleCheckout = async () => {
    if (!totalPrice) return;
    const order_id = generateId();
    const res = await paymentCall({
      amount: totalPrice.toString(),
      transaction_type: "payout",
      currency: "BDT",
      merchant_order_id: order_id,
      callback_url: `${window.location.origin}/payment-status`,
    });
    if (res?.success) {
      console.log(res);
      window.open(res?.bdpay_url, "_blank");
      window.location.reload();
    } else {
      toast.error(res?.error_message);
    }
  };

  const handleLogout = () => {
    clearToken();
    setIsLogin(null);
    navigate("/login");
  };

  useEffect(() => {
    if (cartList?.length) {
      setCartCount(cartList?.length);
      setTotalPrice(
        cartList.reduce((acc, curr) => acc + curr.price * curr.count, 0)
      );
    } else {
      setCartCount(0);
      setTotalPrice(0);
    }
  }, [cartList]);

  return (
    <div className={styles.layout}>
      <Container>
        <header className={styles.header}>
          <div className={styles.header_left}>
            <span className={styles.logo}>Shopping</span>
            <span className={styles.name}>{isLogin?.business_name}</span>
          </div>
          <div className={styles.header_right}>
            {/* <img src="/images/logo.svg" alt="" /> */}
            {isLogin?.business_type !== "withdraw" && (
              <IconButton
                onClick={() =>
                  isLogin?.business_type !== "withdraw" ? open() : null
                }
                disabled={isLogin?.business_type === "withdraw"}
              >
                <LuShoppingCart />
                {isLogin?.business_type !== "withdraw" && (
                  <span className={styles.count}>{cartCount}</span>
                )}
              </IconButton>
            )}
            {isLogin?.business_type !== "deposit" && (
              <IconButton onClick={() => openModal()}>
                <PiHandWithdraw />
              </IconButton>
            )}
            <CustomButton size="small" color="info" onClick={handleLogout}>
              Logout
            </CustomButton>
          </div>
        </header>
      </Container>
      {children}
      <CustomDrawer
        title="Cart list"
        anchor="right"
        open={isOpen}
        onClose={() => close()}
        className={styles.cart_wrapper}
      >
        <>
          <div className={styles.cart_listing}>
            {cartList?.map((item) => (
              <CartCard data={item} key={item?.id} />
            ))}
          </div>
          <div className={styles.cart_footer}>
            <div className={styles.total_price}>
              <b>Total:</b> <span>৳ {totalPrice}</span>
            </div>
            <div className={styles.footer_btn}>
              <CustomButton
                onClick={handleCheckout}
                disabled={!totalPrice}
                loading={loading}
              >
                Proceed checkout
              </CustomButton>
            </div>
          </div>
        </>
      </CustomDrawer>
      <CustomModal
        open={isOpenModal}
        onClose={() => closeModal()}
        maxWidth={500}
        title="Withdraw amount"
      >
        <div className={styles.withdraw_modal}>
          <form onSubmit={formik.handleSubmit}>
            <InputField
              regex={numberRegExp}
              label="Withdraw amount"
              name="amount"
              formik={formik}
              placeholder="Enter amount"
            />
            <div className={styles.submit_btn}>
              <CustomButton loading={loadingWithdrawAmount} type="submit">
                Withdraw
              </CustomButton>
            </div>
          </form>
        </div>
      </CustomModal>
    </div>
  );
};

export default DemoLayout;
