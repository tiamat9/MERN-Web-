import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Employees() {
  const axiosPrivate = useAxiosPrivate();
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const logout = useLogout();

  const fetchEmployees = async () => {
    try {
      const response = await axiosPrivate.get(
        "http://localhost:3500/employees",
        {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      const { data } = response;
      console.log(data);
      setEmployees(data);
    } catch (error) {
      console.error(error);
      return setEmployees([]);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold mb-5">
                This is a protected route.
              </h1>
              {employees.length
                ? employees.map((employee) => (
                    <div key={employee._id}>
                      <p>{employee.firstname + " " + employee.lastname}</p>
                    </div>
                  ))
                : null}
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/")}
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Employees;
