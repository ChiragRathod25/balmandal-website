import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";

import {
  AddAchievement,
  EditAchievement,
  AlltAchievement,
  Achievement,
  AddTalent,
  EditTalent,
  AllTalent,
  Talent,
  AddParent,
  EditParent,
  AllParent,
  Parent,
  Home,
  Login,
  Register,
  Logout,
 AdminDashboard,
  UserData,
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
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path : "/logout",
        element : <Logout />
      },
      {
        path: "/achievement",
        element: (
          <AuthLayout>
            <AlltAchievement />
          </AuthLayout>
        ),
      },
      {
        path: "/achievement/:achievementId",
        element: (
          <AuthLayout>
            <Achievement />
          </AuthLayout>
        ),
      },
      {
        path: "/achievement/edit/:achievementId",
        element: (
          <AuthLayout>
            <EditAchievement />
          </AuthLayout>
        ),
      },
      {
        path: "/achievement/add",
        element: (
          <AuthLayout>
            <AddAchievement />
          </AuthLayout>
        ),
      },
      {
        path: "parent",
        children: [
          {
            path: "",
            element: (
              <AuthLayout>
                <AllParent />
              </AuthLayout>
            ),
          },
          {
            path: "add",
            element: (
              <AuthLayout>
                <AddParent />
              </AuthLayout>
            ),
          },
          {
            path: ":parentId",
            element: (
              <AuthLayout>
                <Parent />
              </AuthLayout>
            ),
          },
          {
            path: "edit/:parentId",
            element: (
              <AuthLayout>
                <EditParent />
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: "talent",
        children: [
          {
            path: "",
            element: (
              <AuthLayout>
                <AllTalent />
              </AuthLayout>
            ),
          },
          {
            path: "add",
            element: (
              <AuthLayout>
                <AddTalent />
              </AuthLayout>
            ),
          },
          {
            path: ":talentId",
            element: (
              <AuthLayout>
                <Talent />
              </AuthLayout>
            ),
          },
          {
            path: "edit/:talentId",
            element: (
              <AuthLayout>
                <EditTalent />
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: "dashboard",
        children: [
          {
            path: "",
            element: (
              <AuthLayout>
                <AdminDashboard />
              </AuthLayout>
            ),
          },
          {
            path: "user/:userId",
            element: (
              <AuthLayout>
                <UserData />
              </AuthLayout>
            ),
          }
        ]
      }
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
