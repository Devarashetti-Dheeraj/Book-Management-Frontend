import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const BookList = ({ books, onEdit, onDelete, itemsPerPage, isAdmin, }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(books.length / itemsPerPage);
    const formatDate = (dateString) => {
        if (!dateString)
            return "N/A";
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                timeZone: "UTC",
            });
        }
        catch {
            return "Invalid Date";
        }
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBooks = books.slice(startIndex, startIndex + itemsPerPage);
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-center text-indigo-700", children: "\uD83D\uDCD6 My Bookshelf" }), books.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow", children: paginatedBooks.map((book) => (_jsxs("div", { className: `relative flex flex-col justify-between p-6 rounded-xl shadow-lg overflow-hidden
                ${isAdmin ? "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200" : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"}
              `, children: [_jsxs("div", { className: "flex flex-col flex-grow mb-4", children: [_jsx("h3", { className: `font-bold text-xl mb-2 ${isAdmin ? "text-blue-800" : "text-gray-800"}`, children: book.title }), _jsxs("p", { className: `text-sm mb-2 ${isAdmin ? "text-slate-600" : "text-gray-600"}`, children: ["by ", book.author] }), _jsxs("p", { className: `text-xs ${isAdmin ? "text-slate-500" : "text-gray-500"}`, children: ["Genre: ", book.genre, " ", _jsx("br", {}), "Published: ", formatDate(book.publishedDate)] })] }), isAdmin ? (_jsxs("div", { className: "flex gap-2 mt-auto", children: [_jsx("button", { onClick: () => onEdit && onEdit(book), className: "flex-1 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-200 hover:bg-blue-300 rounded-md transition", children: "Edit" }), _jsx("button", { onClick: () => book._id && onDelete(book._id), className: "flex-1 px-3 py-2 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-md transition", children: "Delete" })] })) : (
                        // For users, add a decorative bottom bar to fill card
                        _jsx("div", { className: "h-12 w-full bg-gray-300 rounded-lg mt-4 opacity-20" }))] }, book._id))) })) : (_jsx("p", { className: "text-center text-gray-500 py-12 text-lg italic flex-grow flex items-center justify-center", children: "No books found. Add one to get started!" })), books.length > itemsPerPage && (_jsxs("div", { className: "mt-6 flex justify-center items-center gap-4", children: [_jsx("button", { onClick: () => setCurrentPage((prev) => Math.max(prev - 1, 1)), disabled: currentPage === 1, className: "px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed", children: "Previous" }), _jsxs("span", { className: "text-gray-700 font-medium", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { onClick: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)), disabled: currentPage === totalPages, className: "px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed", children: "Next" })] }))] }));
};
export default BookList;
