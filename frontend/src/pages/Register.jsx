import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../api/axios";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cfmPassword, setCfmPassword] = useState("");

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    if (password !== cfmPassword)
      return alert("Password and Confirm Password must be the same");

    const url = "http://localhost:3500/register";

    const body = {
      user: username,
      pwd: password,
    };

    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { data } = response;

      console.log(data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
    console.log(username, password, cfmPassword);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        className="card w-1/3 bg-neutral text-neutral-content"
        onSubmit={onHandleSubmit}
      >
        <div className="card-body items-center text-center">
          <div className="card-actions">
            <button
              className="btn btn-square btn-sm absolute top-8 left-8"
              onClick={() => navigate("/login")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="card-title">Register</h2>
          </div>

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
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs mb-10"
              value={cfmPassword}
              onChange={(e) => setCfmPassword(e.target.value)}
            />
          </div>

          <div className="card-actions w-full justify-center">
            <button className="btn btn-info w-2/3">Register</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
