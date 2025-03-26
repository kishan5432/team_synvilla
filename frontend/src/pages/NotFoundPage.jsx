import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 mt-4">
        Page Not Found
      </h2>
      <p className="text-lg md:text-xl text-gray-500 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg md:text-xl font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
