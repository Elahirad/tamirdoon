import { Outlet, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import ServicemanSigninPage from "./pages/Servicemen/ServicemenSigninPage";
import ServicemanSignupPage from "./pages/Servicemen/ServicemenSignupPage";
import ServicemanHomePage from "./pages/Servicemen/ServicemenHomePage";
import AdminPanelHomePage from "./pages/Admin/Panel/AdminPanelHomePage";
import AdminSigninPage from "./pages/Admin/AdminSigninPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminPanelUsersPage from "./pages/Admin/Panel/AdminPanelUsersPage";
import AdminPanelAdsPage from "./pages/Admin/Panel/AdminPanelAdsPage";
import AdminPanelServicemenPage from "./pages/Admin/Panel/AdminPanelServicemenPage";

const router = createBrowserRouter([
  {
    path: "/admin",
    children: [
      {
        path: "panel",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminPanelHomePage /> },
          { path: "users", element: <AdminPanelUsersPage /> },
          { path: "ads", element: <AdminPanelAdsPage /> },
          { path: "servicemen", element: <AdminPanelServicemenPage /> },
        ],
      },
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
