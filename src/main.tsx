import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import NavBar from "./layouts/NavBar";
import CreatePost from "./pages/CreatePost";
import IndexInitial from "./pages/IndexInitial";
import IndexPost from "./pages/IndexPost";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexInitial />,
  },
  {
    path: "/nav",
    element: <NavBar />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/post/:id/:postAuthorId",
    element: <IndexPost />,
  },
  {
    path: "/newPost",
    element: <CreatePost />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
