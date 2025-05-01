import { StyleSheet, Pressable, Text, View } from "react-native";
import ThemedView from "../../components/ThemedView";
import { Link } from "expo-router";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import { Colors } from "../../constants/Colors";

export default function Register() {
  const handleSubmit = () => {
    console.log("login form submited");
  };

  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} style={styles.title}>
        Register For an Account
      </ThemedText>

      <ThemedButton onPress={handleSubmit}>
        <Text style={{ color: "#f2f2f2" }}>Register</Text>
      </ThemedButton>

      <Spacer height={100} />
      <Link href="/login" style={styles.link}>
        <ThemedText style={{ textAlign: "center" }}>Login instead</ThemedText>
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
});
