import { Outlet, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import ServicemanSigninPage from "./pages/Servicemen/ServicemenSigninPage";
import ServicemanSignupPage from "./pages/Servicemen/ServicemenSignupPage";
import ServicemanHomePage from "./pages/Servicemen/ServicemenHomePage";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import AdminSigninPage from "./pages/Admin/AdminSigninPage";

const router = createBrowserRouter([
  {
    path: "/admin",
    children: [
      { index: true, element: <AdminHomePage /> },
      {
        path: "signin",
        element: <AdminSigninPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/signin", element: <SigninPage /> },
      {
        path: "/servicemen",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ServicemanHomePage />,
          },
          {
            path: "signup",
            element: <ServicemanSignupPage />,
          },
          {
            path: "signin",
            element: <ServicemanSigninPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
