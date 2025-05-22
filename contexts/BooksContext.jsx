import { createContext, useEffect, useState } from "react";
import { client, databases } from "../lib/appwrite";
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
      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id
      );
      return response;
    } catch (error) {
      console.log(error.message);
      throw error;
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
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);

      setBooks((prevBooks) => prevBooks.filter((book) => book.$id !== id));
      return true;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async function updateBook(id, data) {
    try {
      const updatedBook = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
        data
      );
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.$id === id ? updatedBook : book))
      );
      return updatedBook;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  useEffect(() => {
    let unsubscribe;

    const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;

    if (user) {
      fetchBooks();

      unsubscribe = client.subscribe(channel, (response) => {
        const { payload, events } = response;

        if (events[0].includes("create")) {
          setBooks((prevBooks) => [...prevBooks, payload]);
        }
      });
    } else {
      setBooks([]);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return (
    <BooksContext.Provider
      value={{
        books,
        fetchBooks,
        fetchBookById,
        createBook,
        deleteBook,
        updateBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}
