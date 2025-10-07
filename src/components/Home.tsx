import { useState, useEffect } from "react";
import API from "../api";
import type { Book } from "../types";
import { Navigate, useNavigate } from "react-router-dom";
import BookForm from "./BookForm";
import BookList from "./BookList";

export default function Home() {
  
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Check token again before rendering
  if (!token) return <Navigate to="/login" />;

  // State declarations
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const res = await API.get<{ data: Book[] }>("/getAllBooks");
      setBooks(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Save (Add or Update) book
  const handleSave = async (book: Book) => {
    try {
      // Prevent duplicates by title + publishedDate
      const duplicate = books.find(
        (b) =>
          b.title.toLowerCase() === book.title.toLowerCase() &&
          b.publishedDate === book.publishedDate &&
          b._id !== selectedBook?._id // allow updating the same book
      );

      if (duplicate) {
        alert("A book with the same title and published date already exists.");
        return;
      }

      if (selectedBook?._id) {
        await API.put(`/updateBook/${selectedBook._id}`, book);
      } else {
        await API.post("/addBook", book);
      }

      fetchBooks();
      setSelectedBook(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete book (admins only)
  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      console.error("Unauthorized: Only admins can delete books");
      return;
    }
    try {
      await API.delete(`/deleteBook/${id}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("UserId");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 flex items-center justify-center p-4">
      <main className="max-w-7xl w-full bg-white rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-200">
        {/* Header with User Info and Logout */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                role === "admin"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {role === "admin" ? "👑 Admin" : `👤 User`}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <span>Logout</span>
          </button>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-center text-indigo-700">
          📚 Book Manager
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section - visible to all, but editing restricted in BookList */}
          <div className="lg:w-1/3">
            <BookForm
              onSave={handleSave}
              selectedBook={selectedBook}
              clearSelection={() => setSelectedBook(null)}
            />
          </div>

          {/* Book List Section */}
          <div className="lg:w-2/3">
            <BookList
              books={books}
              // @ts-ignore
              onEdit={isAdmin ? setSelectedBook : undefined} // only admins can edit
              onDelete={handleDelete}
              itemsPerPage={3}
              isAdmin={isAdmin}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
