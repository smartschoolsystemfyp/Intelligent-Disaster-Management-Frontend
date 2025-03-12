import React, { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useService } from "./context/service";
import Loader from "./components/Loader";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Stripe = lazy(() => import("./pages/stripe/Stripe"));
const Layout = lazy(() => import("./layouts/Index"));
const Home = lazy(() => import("./pages/home/Home"));
const Volunteer = lazy(() => import("./pages/volunteer/Volunteer"));
const Disaster = lazy(() => import("./pages/disaster/Disaster"));
const Donation = lazy(() => import("./pages/donation/Donation"));
const Resource = lazy(() => import("./pages/resource/Resource"));
const Setting = lazy(() => import("./pages/settings/Setting"));
const Weather = lazy(() => import("./pages/weather/Weather"));

const Loading = () => (
  <div className="flex justify-center items-center h-screen text-[0.93rem]">
    <i className="fas fa-spinner fa-spin mr-2"></i> Loading...
  </div>
);

const ProtectedRoute = () => {
  const token = localStorage.getItem("token") || null;
  return token ? <Outlet /> : <Navigate to="/" />;
};

const App = () => {
  const { loading } = useService();

  return (
    <>
      <Toaster />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/stripe" element={<Stripe />} />

          {/* Protected Routes */}
          <Route path="/dms/*" element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="volunteer" element={<Volunteer />} />
              <Route path="disaster" element={<Disaster />} />
              <Route path="donations" element={<Donation />} />
              <Route path="resources" element={<Resource />} />
              <Route path="weather" element={<Weather />} />
              <Route path="settings" element={<Setting />} />
              <Route path="*" element={<Navigate to="/dms/" />} />
            </Route>
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
