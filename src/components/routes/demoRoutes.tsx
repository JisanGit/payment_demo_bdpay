import { Route, Routes } from "react-router-dom";
import HomePage from "src/modules/demo/home";
import PageNotFound from "../../modules/404";
import PaymentStatus from "src/modules/demo/payment-status";
import { AuthPrivateRoute, PrivateRoute } from "../privateRoute";
import Login from "src/modules/demo/login";

const PaymentRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<PrivateRoute component={Dashboard} />} /> */}
      <Route path="/" element={<PrivateRoute component={HomePage} />} />
      <Route path="/login" element={<AuthPrivateRoute component={Login} />} />
      <Route path="/payment-status" element={<PaymentStatus />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default PaymentRoutes;
