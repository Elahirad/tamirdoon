import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme.ts";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <GoogleOAuthProvider clientId="235966621376-febvbsti7cd4ho8kaqgce1a06qpbava6.apps.googleusercontent.com">
        <ColorModeScript
          initialColorMode={theme.themeConfig.initialColorMode}
        />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
