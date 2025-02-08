import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const authStatus=useSelector((store)=>store.auth.status)
  console.log(authStatus);
  
  return (
    <>
    <div>

    {authStatus}
    </div>
    </>
  )
}

export default Home