import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "src/modules/404";
import Payment from "src/modules/payment";
import PaymentWithdraw from "src/modules/payment/withdraw";

const MerchantRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/payment" replace={true} />} />
      <Route index path="/payment" element={<Payment />} />
      <Route index path="/payin" element={<PaymentWithdraw />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MerchantRoutes;
