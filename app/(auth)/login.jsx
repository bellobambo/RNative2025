import {
  StyleSheet,
  Pressable,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import ThemedView from "../../components/ThemedView";
import { Link } from "expo-router";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import { Colors } from "../../constants/Colors";
import ThemedTextInput from "../../components/ThemedTextInput";
import { useState } from "react";
import { useUser } from "../../hooks/useUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useUser();

  const handleSubmit = async () => {
    setError(null);
    try {
      await login({ email, password });
    } catch (error) {
      setError(error.message);
      // console.error("Error registering user:", error);
      // console.log(error.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} style={styles.title}>
        Login to your Account
      </ThemedText>

      <ThemedTextInput
        style={{ width: "80%", marginBottom: 20 }}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />

      <ThemedTextInput
        style={{ width: "80%", marginBottom: 20 }}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />

      <ThemedButton onPress={handleSubmit}>
        <Text style={{ color: "#f2f2f2" }}>Login</Text>
      </ThemedButton>

      <Spacer />
      {error && <Text style={styles.error}>{error}</Text>}

      <Spacer height={100} />
      <Link href="/register" style={styles.link}>
        <ThemedText style={{ textAlign: "center" }}>
          Register instead
        </ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 30,
    fontSize: 18,
    textAlign: "center",
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.8,
  },
  error: {
    color: Colors.warning,
    textAlign: "center",
    padding: 10,
    backgroundColor: "#f5c1c8",
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  },
});
