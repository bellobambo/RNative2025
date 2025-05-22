import {
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import Spacer from "../../../components/Spacer";
import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView";
import ThemedCard from "../../../components/ThemedCard";
import ThemedButton from "../../../components/ThemedButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { BooksContext } from "../../../contexts/BooksContext";

const BookDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { fetchBookById, deleteBook, updateBook } = useContext(BooksContext);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadBook = async () => {
      try {
        setLoading(true);
        const bookData = await fetchBookById(id);
        setBook(bookData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadBook();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteBook(id);
      router.push("/books");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    router.push({
      pathname: "/books/edit",
      params: {
        id: book.$id,
        title: book.title,
        author: book.author,
        description: book.description,
      },
    });
  };

  if (loading) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedText>Loading book details...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedText>Error: {error}</ThemedText>
      </ThemedView>
    );
  }

  if (!book) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedText>Book not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView safe={true} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedCard style={styles.card}>
          <ThemedText type="title" style={styles.title}>
            {book.title}
          </ThemedText>

          <Spacer height={16} />

          <ThemedText type="subtitle">Author:</ThemedText>
          <ThemedText>{book.author}</ThemedText>

          <Spacer height={16} />

          <ThemedText type="subtitle">Description:</ThemedText>
          <ThemedText>{book.description}</ThemedText>

          <Spacer height={24} />

          <ThemedButton onPress={handleEdit}>
            <Text style={styles.text}>Edit Book</Text>
          </ThemedButton>

          <Spacer height={16} />

          <TouchableOpacity
            onPress={handleDelete}
            style={[styles.button, styles.deleteButton]}
          >
            {isDeleting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Delete Book</Text>
            )}
          </TouchableOpacity>
        </ThemedCard>
      </ScrollView>
    </ThemedView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  editButton: {
    backgroundColor: "#D3D3D31A",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1,
  },
});
