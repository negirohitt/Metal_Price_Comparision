import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Dashboard } from "./pages/Dashboard";
import { Comparison } from "./pages/Comparison";
import { History } from "./pages/History";
import { Admin } from "./pages/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "compare", Component: Comparison },
      { path: "history", Component: History },
      { path: "admin", Component: Admin },
    ],
  },
]);
