import { createContext, useEffect, useState } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = "682b676b002769a6a09e";
const COLLECTION_ID = "682b6783000b1baefd51";

export const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const { user } = useUser();

  async function fetchBooks() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("userId", user.$id)]
      );
      setBooks(response.documents);
      console.log("All Books", response.documents);
    } catch (error) {
      console.message(error.message);
    }
  }

  async function fetchBookById(id) {
    try {
    } catch (error) {
      console.log(error.message);
    }
  }

  async function createBook(data) {
    try {
      const newBook = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        { ...data, userId: user.$id },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );
    } catch (error) {
      console.message(error.message);
    }
  }

  async function deleteBook(id) {
    try {
    } catch (error) {
      console.message(error.message);
    }
  }

  useEffect(() => {
    if (user) {
      fetchBooks();
    } else {
      setBooks([]);
    }
  }, [user]);

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
}
