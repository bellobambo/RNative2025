import { createContext, useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import { ID } from "react-native-appwrite";
import { Alert } from "react-native"; // Import Alert for showing messages

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  async function login({ email, password }) {
    try {
      // Check if there's an active session first
      const currentSession = await account
        .getSession("current")
        .catch(() => null);

      if (currentSession) {
        Alert.alert("Already Logged In", "You are already logged in.");
        return;
      }

      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      setUser(response);
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Login Failed", error.message);
      throw Error(error.message);
    }
  }

  async function register({ email, password }) {
    try {
      await account.create(ID.unique(), email, password);
      await login({ email, password });
    } catch (error) {
      console.error("Error registering user:", error);
      Alert.alert("Registration Failed", error.message);
      throw Error(error.message);
    }
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function getInitialUserValue() {
    try {
      const response = await account.get();
      setUser(response);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialUserValue();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        authChecked,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
