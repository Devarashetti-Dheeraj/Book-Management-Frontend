import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const NotFound = () => {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-9xl font-bold text-gray-300 mb-4", children: "404" }), _jsx("h2", { className: "text-3xl font-semibold mb-2", children: "Lost in the Library?" }), _jsx("p", { className: "text-gray-600 mb-6", children: "The page you're looking for doesn\u2019t exist. Maybe the book got misplaced." }), _jsx(Link, { to: "/", className: "inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition", children: "Go Back Home" })] }), _jsx("div", { className: "mt-10", children: _jsx("img", { src: "https://img.icons8.com/ios-filled/250/book.png", alt: "Book Icon", className: "opacity-50" }) })] }));
};
export default NotFound;
