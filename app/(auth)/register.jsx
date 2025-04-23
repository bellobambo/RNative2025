import { StyleSheet, Text, View } from "react-native";
import ThemedView from "../../components/ThemedView";
import { Link } from "expo-router";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";

export default function Register() {
  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} style={styles.title}>
        Register For an Account
      </ThemedText>

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
  },
  title: {
    marginBottom: 30,
    fontSize: 18,
    textAlign: "center",
  },
});
