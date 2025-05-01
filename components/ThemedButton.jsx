import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedButton = ({ style, ...props }) => {
  const handleSubmit = () => {
    console.log("login form submited");
  };

  return (
    <Pressable
      onPress={handleSubmit}
      style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      {...props}
    />
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.8,
  },
});
