import { useState, useEffect } from "react";
import API from "./api";
import type { Book } from "./types";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import "./App.css";


export default function App() {
                               //type declaration
  const [books, setBooks] = useState<Book[]>([]);
                                              //type interface
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const fetchBooks = async () => {
    try {
                  //api fetching with type interface
      const res = await API.get<{data: Book[]}>("/getAllBooks");
      setBooks(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // fetchbooks when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);
      
  
  //Creating and Updating
                          //type interface
  const handleSave = async (book: Book) => {
    try {
      //if the selected book HAS an _id which is from MongoDB
      if (selectedBook?._id) {
                        //sending the selected _id to backend
        await API.put(`/updateBook/${selectedBook._id}`, book);
      } else {
                  //if no unique MongoDB _id then just post it as new.
        await API.post("/addBook", book);
      }
      fetchBooks();
      setSelectedBook(null);
    } catch (err) {
      console.error(err);
    }
  };

  //deletion
  const handleDelete = async (id: string) => {
    try {
                    //straight to backend
      await API.delete(`/deleteBook/${id}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 flex items-center justify-center p-4">
      <main className="max-w-7xl w-full bg-white rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-200">
        <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-center text-indigo-700">
          📚 Book Manager
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
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
              onEdit={setSelectedBook}
              onDelete={handleDelete}
              itemsPerPage={3}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
