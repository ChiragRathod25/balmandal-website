import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function AuthLayout({ children, authentication = true }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.auth.status);  
  useEffect(() => {

    console.log("AuthLayout authStatus: ",authStatus);

    if(authentication===false){
      console.log("Authentication is not required !")
    }
    else if (authentication && authStatus !== authentication) 
        navigate("/login");
    
    // else if (!authentication && authStatus !== authentication) 
    //     navigate("/");

    setLoading(false);
  }, [authStatus, navigate, authentication]);
  return loading ? (
    <>
      <h2>Loading...</h2>
    </>
  ) : (
    <>{children}</>
  );
}

export default AuthLayout;
