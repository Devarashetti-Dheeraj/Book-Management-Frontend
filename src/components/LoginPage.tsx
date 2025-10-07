import { useState } from "react";
import LoginView from "./LoginView";
import SignUpView from "./SignupPage";

const LoginPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* Left-side image column (hidden on mobile) */}
        <div className="hidden md:flex items-center justify-center p-8 bg-blue-50">
          <img
            src="https://res.cloudinary.com/dkwllsxnd/image/upload/v1756201562/Rectangle_1467_ry7la4.png"
            alt="An open book on a table"
            className="rounded-xl shadow-md w-full object-cover"
          />
        </div>

        {/* Right-side form column */}
        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6 text-indigo-700 text-center">
            {isLoginView ? "🔑 Login" : "📝 Sign Up"}
          </h1>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            {isLoginView ? (
              <LoginView toggleView={toggleView} />
            ) : (
              <SignUpView toggleView={toggleView} />
            )}
          </div>
          <p className="text-center mt-4 text-sm text-gray-500">
            {isLoginView ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleView}
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              {isLoginView ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
