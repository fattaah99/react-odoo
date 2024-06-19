import React from "react";

// const MainPage = ({ token, session_id }) => {
const MainPage = ({ token }) => {
  // Change session_id to sessionId
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Main Page</h2>
          <p className="text-gray-700 text-center">Welcome! Your token is: {token}</p>
          {/* <p className="text-gray-700 text-center">Welcome! Your session ID is: {session_id}</p> */}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
