import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const authStatus = useSelector((store) => store.auth.status);
  console.log(authStatus);
  return (
    <>
      <div>{authStatus ? <h2>Authorized</h2> : <h2>Unauthorized</h2>}</div>
    </>
  );
}

export default Home;
