import React, { useState } from "react";
import type { Book } from "../types";

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  itemsPerPage: number;
}

const BookList: React.FC<BookListProps> = ({books, onEdit, onDelete, itemsPerPage, }) => {
  
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
    } catch (error) {
      console.error("Invalid date string:", dateString, error);
      return "Invalid Date";
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = books.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-slate-200 text-blue-700 text-center">
        📖 My Bookshelf
      </h2>

      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 flex-grow">
          {paginatedBooks.map((book) => (
            <div
              key={book._id}
              className="bg-blue-50 p-5 rounded-lg shadow-sm border border-blue-100 flex flex-col justify-between hover:shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-1"
            >
              <div>
                <h3 className="font-bold text-lg text-blue-800 mb-1 leading-tight">
                  {book.title}
                </h3>
                <p className="text-sm text-slate-600 mb-2">
                  by <span className="font-medium">{book.author}</span>
                </p>
                <p className="text-xs text-slate-500 mb-3">
                  Genre: {book.genre} <br />
                  Published: {formatDate(book.publishedDate)}
                </p>
              </div>

              <div className="flex gap-2 mt-auto pt-3 border-t border-blue-100">
                <button
                  onClick={() => onEdit(book)}
                  className="flex-1 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-200 hover:bg-blue-300 rounded-md transition-all active:scale-95 shadow-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => book._id && onDelete(book._id)}
                  className="flex-1 px-3 py-2 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-md transition-all active:scale-95 shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500 py-12 text-lg italic flex-grow flex items-center justify-center">
          No books found. Add one to get started!
        </p>
      )}

      {/* Pagination Controls */}
      {books.length > itemsPerPage && (
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookList;
