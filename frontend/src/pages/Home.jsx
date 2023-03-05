import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

function Home() {
  // const axiosPrivate = useAxiosPrivate();
  // const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const logout = useLogout();

  return (
    <div className="App">
      <header className="App-header">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold mb-5">Home page</h1>
              {!localStorage.getItem("accessToken") ? (
                <button
                  className="btn btn-primary m-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-primary m-2"
                    onClick={() => navigate("/employees")}
                  >
                    Employees
                  </button>
                  <button className="btn btn-secondary m-2" onClick={logout}>
                    Sign out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
