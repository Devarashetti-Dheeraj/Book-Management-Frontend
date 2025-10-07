import React from "react"
import { Link } from "react-router-dom"

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-2">Lost in the Library?</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn’t exist. Maybe the book got misplaced.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
      <div className="mt-10">
        <img
          src="https://img.icons8.com/ios-filled/250/book.png"
          alt="Book Icon"
          className="opacity-50"
        />
      </div>
    </div>
  );
};

export default NotFound;
