import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginViewProps {
  toggleView: () => void;
}

interface User {
  id: string;
  role: string;
  email?: string;
  username?: string;
}

interface LoginResponse {
  token: string;
  user: User;
  error_msg?: string;
}

const LoginView: React.FC<LoginViewProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showSubmitError, setShowSubmitError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLoginSuccess = (token: string, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
    localStorage.setItem("UserId", user.id);
    window.dispatchEvent(new Event("storage"));
    navigate("/", { replace: true });
  };

  const onSubmitFailure = (message: string) => {
    setShowSubmitError(true);
    setErrorMsg(message);
    setLoading(false);
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setShowSubmitError(false);

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      if (response.ok) {
        handleLoginSuccess(data.token, data.user);
      } else {
        onSubmitFailure(data.error_msg || "Login failed");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      onSubmitFailure("Network error: " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 w-full max-w-md mx-auto">
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://res.cloudinary.com/dkwllsxnd/image/upload/v1756227343/bookhub-high-resolution-logo-transparent_ubbg5q.png"
          alt="BookHub Logo"
          className="h-12 w-auto mb-2 drop-shadow-md"
        />
        <span className="text-2xl font-extrabold text-indigo-700">
          BookManager
        </span>
      </div>

      <h2 className="text-xl font-semibold text-center text-indigo-700 mb-6">
        Login to Your Account
      </h2>

      <form className="flex flex-col gap-4" onSubmit={submitForm}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {showSubmitError && (
          <p className="text-red-500 text-center">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-70 ${
            loading ? "cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginView;
