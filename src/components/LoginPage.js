import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import LoginView from "./LoginView";
import SignUpView from "./SignupPage";
const LoginPage = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const toggleView = () => {
        setIsLoginView(!isLoginView);
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 flex items-center justify-center p-4 font-sans", children: _jsxs("div", { className: "w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 overflow-hidden", children: [_jsx("div", { className: "hidden md:flex items-center justify-center p-8 bg-blue-50", children: _jsx("img", { src: "https://res.cloudinary.com/dkwllsxnd/image/upload/v1756201562/Rectangle_1467_ry7la4.png", alt: "An open book on a table", className: "rounded-xl shadow-md w-full object-cover" }) }), _jsxs("div", { className: "p-8 flex flex-col justify-center", children: [_jsx("h1", { className: "text-4xl font-bold mb-6 text-indigo-700 text-center", children: isLoginView ? "🔑 Login" : "📝 Sign Up" }), _jsx("div", { className: "bg-white p-6 rounded-xl shadow-md border border-gray-100", children: isLoginView ? (_jsx(LoginView, { toggleView: toggleView })) : (_jsx(SignUpView, { toggleView: toggleView })) }), _jsxs("p", { className: "text-center mt-4 text-sm text-gray-500", children: [isLoginView ? "Don't have an account?" : "Already have an account?", " ", _jsx("button", { onClick: toggleView, className: "text-blue-600 font-semibold hover:underline cursor-pointer", children: isLoginView ? "Sign Up" : "Login" })] })] })] }) }));
};
export default LoginPage;
