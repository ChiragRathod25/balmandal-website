import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import databaseService from "./services/database.services";
import { useDispatch } from "react-redux";
import { login, logout } from "./slices/userSlice/authSlice";

function App() {
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();
  
  useEffect(() => {
    databaseService
      .getCurrentuser()
      .then((response) => {
        if (response.data) {
          dispatch(login(response.data));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-700">
      <Outlet />
    </div>
  );
}

export default App;
