import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  console.log("ProtectedRoute started >>>>>>" + auth?.isAuthenticated);

  useEffect(() => {
    console.log(auth?.roles, auth?.accessToken);
  }, [auth?.roles, auth?.accessToken]);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.isAuthenticated ? verifyRefreshToken() : setIsLoading(false);
    console.log("PR UseEffect running.");

    return () => (isMounted = false);
  }, [auth?.isAuthenticated, refresh]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : auth?.isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};
export default ProtectedRoute;
