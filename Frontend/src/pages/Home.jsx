import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const authStatus = useSelector((store) => store.auth.status);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        {authStatus ? (
          <h2 className="text-2xl font-bold text-green-600">Authorized</h2>
        ) : (
          <h2 className="text-2xl font-bold text-red-600">Unauthorized</h2>
        )}
      </div>
    </div>
  );
}

export default Home;
