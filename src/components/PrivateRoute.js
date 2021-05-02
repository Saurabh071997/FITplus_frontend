import { useAuth } from "../context/AuthProvider";
import { Route, Navigate } from "react-router-dom";

export function PrivateRoute({ path, ...props }) {
  const {
    authState: { userLoggedIn }
  } = useAuth();

  return JSON.parse(localStorage?.getItem("user"))?.userLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
