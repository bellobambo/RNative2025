import { useState, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import Spacer from "../../../components/Spacer";
import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView";
import ThemedCard from "../../../components/ThemedCard";
import ThemedButton from "../../../components/ThemedButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BooksContext } from "../../../contexts/BooksContext";

const EditBook = () => {
  const router = useRouter();
  const {
    id,
    title: initialTitle,
    author: initialAuthor,
    description: initialDescription,
  } = useLocalSearchParams();
  const { updateBook } = useContext(BooksContext);

  const [title, setTitle] = useState(initialTitle || "");
  const [author, setAuthor] = useState(initialAuthor || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!title || !author) {
      Alert.alert("Error", "Title and author are required");
      return;
    }

    try {
      setIsLoading(true);
      await updateBook(id, { title, author, description });
      setError(null);
      router.replace("/books");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setError(null);
    router.back();
  };

  return (
    <ThemedView safe={true} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedCard style={styles.card}>
          <ThemedText type="title">Edit Book</ThemedText>

          <Spacer height={24} />

          <ThemedText type="subtitle">Title:</ThemedText>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Book title"
            placeholderTextColor="#aaa"
          />

          <Spacer height={16} />

          <ThemedText type="subtitle">Author:</ThemedText>
          <TextInput
            style={styles.input}
            value={author}
            onChangeText={setAuthor}
            placeholder="Book author"
            placeholderTextColor="#aaa"
          />

          <Spacer height={16} />

          <ThemedText type="subtitle">Description:</ThemedText>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Book description"
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={4}
          />

          <Spacer height={24} />

          {error && (
            <>
              <ThemedText style={styles.error}>{error}</ThemedText>
              <Spacer height={16} />
            </>
          )}

          <ThemedButton onPress={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <ThemedText>Update Book</ThemedText>
            )}
          </ThemedButton>

          <Spacer height={16} />

          <ThemedButton
            onPress={handleCancel}
            variant="secondary"
            disabled={isLoading}
          >
            <ThemedText>Cancel</ThemedText>
          </ThemedButton>
        </ThemedCard>
      </ScrollView>
    </ThemedView>
  );
};

export default EditBook;

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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    marginTop: 8,
    color: "white",
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});
