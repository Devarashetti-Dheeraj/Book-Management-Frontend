import React, { useState } from "react";
import type { Book } from "../types";

interface BookListProps {
  books: Book[];
  onEdit?: (book: Book) => void;
  onDelete: (id: string) => void;
  itemsPerPage: number;
  isAdmin: boolean;
}

const BookList: React.FC<BookListProps> = ({
  books,
  onEdit,
  onDelete,
  itemsPerPage,
  isAdmin,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(books.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = books.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
        📖 My Bookshelf
      </h2>

      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
          {paginatedBooks.map((book) => (
            <div
              key={book._id}
              className={`relative flex flex-col justify-between p-6 rounded-xl shadow-lg overflow-hidden
                ${isAdmin ? "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200" : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"}
              `}
            >
              {/* Book Content */}
              <div className="flex flex-col flex-grow mb-4">
                <h3 className={`font-bold text-xl mb-2 ${isAdmin ? "text-blue-800" : "text-gray-800"}`}>
                  {book.title}
                </h3>
                <p className={`text-sm mb-2 ${isAdmin ? "text-slate-600" : "text-gray-600"}`}>
                  by {book.author}
                </p>
                <p className={`text-xs ${isAdmin ? "text-slate-500" : "text-gray-500"}`}>
                  Genre: {book.genre} <br />
                  Published: {formatDate(book.publishedDate)}
                </p>
              </div>

              {/* Buttons only for Admin */}
              {isAdmin ? (
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => onEdit && onEdit(book)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-200 hover:bg-blue-300 rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => book._id && onDelete(book._id)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                // For users, add a decorative bottom bar to fill card
                <div className="h-12 w-full bg-gray-300 rounded-lg mt-4 opacity-20"></div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-12 text-lg italic flex-grow flex items-center justify-center">
          No books found. Add one to get started!
        </p>
      )}

      {/* Pagination */}
      {books.length > itemsPerPage && (
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookList;
