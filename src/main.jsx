import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Home from "./pages/Home.jsx";
import AllCourses from "./pages/AllCourses.jsx";
import AllUsers from "./pages/AllUsers.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./components/404.jsx";
import AuthContextProvider from "./contexts/AuthContextProvider.jsx";
import Layout from "./components/Layout.jsx";
import Corso from "./pages/Corso.jsx";

const router = createBrowserRouter(
  [
    {
      element: <AuthContextProvider><Layout /></AuthContextProvider>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "corsi/",
          children: [
            {
              path: "",
              element: <AllCourses />,
            },
            {
              path: ":id",
              element: <Corso />,
            },
          ]
        },
        {
          path: "admin/utenti",
          element: <AllUsers />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "registrazione",
          element: <Register />,
        },
        {
          path: "utente/profilo",
          element: <Profile />,
        },
        {
          path: "*",
          element: <NotFound />,
        }
      ],
    },
  ],
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
