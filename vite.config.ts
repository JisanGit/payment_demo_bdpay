import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load the environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), "");
  console.log("User type:", env.VITE_USER_TYPE);
  // Determine the output directory based on the user type
  let outDir = "build";
  if (env.VITE_USER_TYPE === "PAYMENT") {
    outDir = "build/build-payment";
  } else if (env.VITE_USER_TYPE === "DEMO") {
    outDir = "build/build-demo";
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        src: "/src",
      },
    },
    server: {
      // host: "0.0.0.0",
      // port: 3000,
    },
    build: {
      outDir,
    },
  };
});
