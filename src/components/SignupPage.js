import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const SignUpView = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSubmitError, setShowSubmitError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSignupSuccess = (token, user) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("role", user.role);
        setLoading(false);
        window.dispatchEvent(new Event("storage"));
    };
    const onSubmitFailure = (msg) => {
        setShowSubmitError(true);
        setErrorMsg(msg);
        setLoading(false);
    };
    const submitSignUpForm = async (event) => {
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
            const data = await response.json();
            if (response.ok) {
                const loginResponse = await fetch("http://localhost:8000/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });
                const loginData = await loginResponse.json();
                if (loginResponse.ok) {
                    handleSignupSuccess(loginData.token, loginData.user);
                }
                else {
                    onSubmitFailure(loginData.error_msg || "Login failed after registration");
                }
            }
            else {
                onSubmitFailure(data.error_msg || "Registration failed");
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            onSubmitFailure("Network error: " + message);
        }
    };
    return (_jsxs("div", { className: "bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 w-full max-w-md mx-auto", children: [_jsxs("div", { className: "flex flex-col items-center mb-6", children: [_jsx("img", { src: "https://res.cloudinary.com/dkwllsxnd/image/upload/v1756227343/bookhub-high-resolution-logo-transparent_ubbg5q.png", alt: "BookHub Logo", className: "h-12 w-auto mb-2 drop-shadow-md" }), _jsx("span", { className: "text-2xl font-extrabold text-indigo-700", children: "BookManager" })] }), _jsx("h2", { className: "text-xl font-semibold text-center text-indigo-700 mb-6", children: "Create Your Account" }), _jsxs("form", { className: "flex flex-col gap-4", onSubmit: submitSignUpForm, children: [_jsx("input", { type: "text", placeholder: "Full Name", value: name, onChange: (e) => setName(e.target.value), required: true, className: "w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400" }), _jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400" }), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400" }), showSubmitError && (_jsx("p", { className: "text-red-500 text-center", children: errorMsg })), _jsx("button", { type: "submit", disabled: loading, className: `w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-70 ${loading ? "cursor-not-allowed" : ""}`, children: loading ? "Creating Account..." : "Create Account" })] })] }));
};
export default SignUpView;
