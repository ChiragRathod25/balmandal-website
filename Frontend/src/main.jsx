import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js"

import {
  AddAchievement,
  EditAchievement,
  Home,
  Login,
  Register,
} from "./pages/index.js";
import { AuthLayout } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
    
            <Login />

        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/achievement",
        element: (
          <AuthLayout>
            <AddAchievement />
          </AuthLayout>
        ),
      },
      {
        path: "/achievement/:achievementId",
        element: <EditAchievement />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>

    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
