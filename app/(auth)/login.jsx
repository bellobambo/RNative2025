import { StyleSheet, Text, View } from "react-native";
import ThemedView from "../../components/ThemedView";
import { Link } from "expo-router";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";

export default function Login() {
  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} style={styles.title}>
        Login to your Account
      </ThemedText>

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
  },
  title: {
    marginBottom: 30,
    fontSize: 18,
    textAlign: "center",
  },
});
