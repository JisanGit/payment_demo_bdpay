import { Navigate } from "react-router-dom";
import { isAuthenticated } from "src/utils/functions/auth";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const hasSession = isAuthenticated();
  return hasSession ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export const AuthPrivateRoute = ({ component: Component, ...rest }) => {
  const hasSession = isAuthenticated();
  return hasSession ? <Navigate to="/" replace /> : <Component {...rest} />;
};
