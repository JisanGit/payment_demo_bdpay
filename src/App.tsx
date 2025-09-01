import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import { lazy, Suspense, useLayoutEffect } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-photo-view/dist/react-photo-view.css";
import { SquareLoader } from "react-spinners";
import "src/styles/App.scss";
import { useApi } from "./hooks/apiCalls";
import { useStore } from "./store";
import theme from "./theme";
import { IS_DEMO, USER_TYPE } from "./utils/constants";
import {
  getAppKey,
  getSecretKey,
  isAuthenticated,
  storeToken,
} from "./utils/functions/auth";

let Routes;
if (USER_TYPE === "DEMO") {
  Routes = lazy(() => import("./components/routes/demoRoutes"));
} else if (USER_TYPE === "PAYMENT") {
  Routes = lazy(() => import("./components/routes/paymentRoutes"));
}

function App() {
  const { setIsLogin, isLogin } = useStore((state: any) => state);

  const [checkKeysCall, { loading: loadingRecheck }] = useApi(
    "/tokenized/checkout/login",
    {
      method: "POST",
    }
  );

  const handleCheckUser = async () => {
    const res = await checkKeysCall({
      "x-app-key": getAppKey(),
      "x-secret-key": getSecretKey(),
    });
    if (res?.success) {
      storeToken(res);
      setIsLogin(res);
    }
  };

  useLayoutEffect(() => {
    if (IS_DEMO) {
      document.body.classList.add("demo");
    } else {
      document.body.classList.remove("demo");
    }

    if (IS_DEMO && isAuthenticated()) {
      handleCheckUser();
    }
  }, []);

  if (loadingRecheck) return <Loader />;

  return (
    <ThemeProvider theme={() => theme(IS_DEMO)}>
      <CssBaseline />
      <Suspense fallback={<Loader />}>
        <Routes />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--primary)",
      }}
    >
      <SquareLoader size={30} color="#fff" />
    </Box>
  );
};
