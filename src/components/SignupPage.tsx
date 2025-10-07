import { useState, type FormEvent } from "react";

interface SignUpViewProps {
  toggleView: () => void;
}

interface ApiResponse {
  token: string;
  user: {
    id: string;
    role: string;
    name: string;
    email: string;
  };
  error_msg?: string;
}

const SignUpView: React.FC<SignUpViewProps> = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showSubmitError, setShowSubmitError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignupSuccess = (token: string, user: ApiResponse["user"]) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("role", user.role);
    setLoading(false);
    window.dispatchEvent(new Event("storage"));
  };

  const onSubmitFailure = (msg: string) => {
    setShowSubmitError(true);
    setErrorMsg(msg);
    setLoading(false);
  };

  const submitSignUpForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setShowSubmitError(false);

    const userDetails = { username: name, email, password };

    try {
      const response = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        const loginResponse = await fetch(
          "http://localhost:8000/api/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        const loginData: ApiResponse = await loginResponse.json();

        if (loginResponse.ok) {
          handleSignupSuccess(loginData.token, loginData.user);
        } else {
          onSubmitFailure(
            loginData.error_msg || "Login failed after registration"
          );
        }
      } else {
        onSubmitFailure(data.error_msg || "Registration failed");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      onSubmitFailure("Network error: " + message);
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
        Create Your Account
      </h2>

      <form className="flex flex-col gap-4" onSubmit={submitSignUpForm}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
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
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default SignUpView;
