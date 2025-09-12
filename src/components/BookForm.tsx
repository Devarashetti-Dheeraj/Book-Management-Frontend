import { useState, useEffect } from "react";
import type { Book } from "../types";

interface Props {
  onSave: (book: Book) => void;
  selectedBook: Book | null;
  clearSelection: () => void;
}

export default function BookForm({ onSave, selectedBook, clearSelection }: Props) {
  const [form, setForm] = useState<Book>({
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
    } else {
      setForm({ _id: "", title: "", author: "", genre: "", publishedDate: "" });
    }
  }, [selectedBook]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow w-full">
      <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-slate-200 text-indigo-700 text-center">
        {selectedBook ? "✍️ Edit Book" : "➕ Add New Book"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "author", "genre"].map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block text-sm font-medium text-slate-600 mb-1 capitalize"
            >
              {field}
            </label>
            <input
              id={field}
              name={field}
              type="text"
              placeholder={`Enter ${field}`}
              value={form[field as keyof Book] || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
        ))}

        {/* Published Date Input */}
        <div>
          <label
            htmlFor="publishedDate"
            className="block text-sm font-medium text-slate-600 mb-1"
          >
            Published Date
          </label>
          <input
            id="publishedDate"
            name="publishedDate"
            type="date"
            value={form.publishedDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-600"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto flex-1 text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg px-5 py-2.5 transition-all duration-200 active:scale-95"
          >
            {selectedBook ? "Update Book" : "Add Book"}
          </button>

          {selectedBook && (
            <button
              type="button"
              onClick={clearSelection}
              className="w-full sm:w-auto flex-1 text-white bg-slate-500 hover:bg-slate-600 font-medium rounded-lg px-5 py-2.5 transition-all duration-200 active:scale-95"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
