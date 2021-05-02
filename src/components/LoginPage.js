import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export function LoginPage() {
  const {
    authState: { userLoggedIn },
    loginUserWithCredentials
  } = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { state } = useLocation();
  let navigate = useNavigate();

  return (
    <>
      <div className="component-head">Login</div>
      <div className="login-block">
        <div className="floating-form">
          <div className="floating-label ">
            <input
              className="floating-input floating-input-outlined"
              type="text"
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label>Email</label>
          </div>

          <div className="floating-label ">
            <input
              className="floating-input floating-input-outlined"
              type="password"
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label>Password</label>
          </div>
          <div className="align-center">
            <button
              className="btn btn-contained-secondary"
              onClick={() => {
                loginUserWithCredentials(email, password);
                navigate("/");
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
