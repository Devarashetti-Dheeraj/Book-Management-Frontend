import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
export default function BookForm({ onSave, selectedBook, clearSelection }) {
    const [form, setForm] = useState({
        _id: "",
        title: "",
        author: "",
        genre: "",
        publishedDate: "",
    });
    useEffect(() => {
        if (selectedBook) {
            const date = selectedBook.publishedDate
                ? new Date(selectedBook.publishedDate).toISOString().split("T")[0]
                : "";
            setForm({ ...selectedBook, publishedDate: date });
        }
        else {
            setForm({ _id: "", title: "", author: "", genre: "", publishedDate: "" });
        }
    }, [selectedBook]);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Prepare payload
        const payload = selectedBook ? form
            : {
                title: form.title,
                author: form.author,
                genre: form.genre,
                publishedDate: form.publishedDate,
            };
        onSave(payload);
        setForm({ _id: "", title: "", author: "", genre: "", publishedDate: "" });
    };
    return (_jsxs("div", { className: "bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow w-full", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 pb-3 border-b border-slate-200 text-indigo-700 text-center", children: selectedBook ? "✍️ Edit Book" : "➕ Add New Book" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [["title", "author", "genre"].map((field) => (_jsxs("div", { children: [_jsx("label", { htmlFor: field, className: "block text-sm font-medium text-slate-600 mb-1 capitalize", children: field }), _jsx("input", { id: field, name: field, type: "text", placeholder: `Enter ${field}`, value: form[field] || "", onChange: handleChange, className: "w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all", required: true })] }, field))), _jsxs("div", { children: [_jsx("label", { htmlFor: "publishedDate", className: "block text-sm font-medium text-slate-600 mb-1", children: "Published Date" }), _jsx("input", { id: "publishedDate", name: "publishedDate", type: "date", value: form.publishedDate, onChange: handleChange, className: "w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-600", required: true })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-2", children: [_jsx("button", { type: "submit", className: "w-full sm:w-auto flex-1 text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg px-5 py-2.5 transition-all duration-200 active:scale-95", children: selectedBook ? "Update Book" : "Add Book" }), selectedBook && (_jsx("button", { type: "button", onClick: clearSelection, className: "w-full sm:w-auto flex-1 text-white bg-slate-500 hover:bg-slate-600 font-medium rounded-lg px-5 py-2.5 transition-all duration-200 active:scale-95", children: "Cancel" }))] })] })] }));
}
