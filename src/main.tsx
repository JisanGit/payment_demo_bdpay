import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Toaster } from "sonner";

import App from "./App";
import { SWRProvider } from "./utils/swrProvider";
import { PhotoProvider } from "react-photo-view";
import { BrowserRouter } from "react-router-dom";
import { IS_DEMO } from "./utils/constants";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SWRProvider>
      <PhotoProvider className="photo_viewer">
        <BrowserRouter>
          {IS_DEMO ? (
            <>
              <title>Shirt shopping</title>
            </>
          ) : (
            <>
              <link rel="icon" type="image/svg+xml" href="/fav.svg" />
              <title>Payorio payment</title>
            </>
          )}
          <App />
        </BrowserRouter>
      </PhotoProvider>
      <Toaster
        position="top-center"
        duration={3000}
        visibleToasts={2}
        richColors
      />
    </SWRProvider>
  </React.StrictMode>
);
