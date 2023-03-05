import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3500/auth";

    const body = {
      user: username,
      pwd: password,
    };

    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const { data } = response;
      const { roles, accessToken } = data;

      localStorage.setItem("accessToken", data.accessToken);
      setAuth({ roles, accessToken, isAuthenticated: true });
      console.log(data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
    console.log(username, password);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        className="card w-1/3 bg-neutral text-neutral-content"
        onSubmit={onHandleSubmit}
      >
        <div className="card-body items-center text-center">
          <h2 className="card-title">Login</h2>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs mb-5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="card-actions w-full justify-center">
            <button className="btn btn-primary w-2/3">Login</button>
          </div>
          <div className="divider"></div>

          <button
            className="btn btn-info w-2/3"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
