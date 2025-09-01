import styles from "./paymentLayout.module.scss";

const PaymentLayout = ({ children }) => {
  return (
    <div
      className={styles.layout}
      style={
        {
          // backgroundImage: "url('/images/patterns/overlay-pattern.png')",
        }
      }
    >
      {children}
    </div>
  );
};

export default PaymentLayout;
