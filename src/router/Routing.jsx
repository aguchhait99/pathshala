import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Home from "../pages/Home";
import About from "../pages/About";
import Blog from "../pages/Blog";
import Contact from "../pages/Contact";
import Courses from "../pages/Courses";
import Profile from "../pages/Profile";
import Register from "../auth/Register";
import BlogDetails from "../pages/BlogDetails";
import CategoryDetails from "../pages/CategoryDetails";
import ApplyCourse from "../pages/ApplyCourse";
import SearchPage from "../pages/SearchPage";

const Routing = () => {
  function ProtectedRoute({ children }) {
    const token =
      localStorage.getItem("auth") || sessionStorage.getItem("auth");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/" />
    );
  }

  // Public Route

  const PublicRoute = [
    {
      path: "/login",
      component: <Login />,
    },
    {
      path: "/register",
      component: <Register />,
    },
    {
      path: "/",
      component: <Home />,
    },
    {
      path: "/about",
      component: <About />,
    },
    {
      path: "/blog",
      component: <Blog />,
    },
    {
      path: "/contact",
      component: <Contact />,
    },
    {
      path: "/courses",
      component: <Courses />,
    },
    {
      path: "/categorydetails/:id",
      component: <CategoryDetails />,
    },
    {
      path: "/searchpage/:encodedItem",
      component: <SearchPage />,
    },
  ];

  // Private Route

  const PrivateRoute = [
    {
      path: "/Profile",
      component: <Profile />,
    },
    {
      path: "/blogdetails/:id",
      component: <BlogDetails />,
    },
    {
      path: "/applycourse/:course/:id",
      component: <ApplyCourse />,
    },
  ];
  return (
    <>
      <Routes>
        {PublicRoute?.map((route, key) => {
          return (
            <>
              <Route
                key={key + 1}
                path={route.path}
                element={route.component}
              />
            </>
          );
        })}
        {PrivateRoute?.map((route, key) => {
          return (
            <>
                <Route
                  key={key + 1}
                  path={route.path}
                  element={<ProtectedRoute>{route.component}</ProtectedRoute>}
                />
            </>
          );
        })}
      </Routes>
    </>
  );
};

export default Routing;
