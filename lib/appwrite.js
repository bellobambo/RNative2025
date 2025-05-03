import { Client, Account, Avatars } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("68052b2e000939def376")
  .setPlatform("dev.bambo.rnative2025");

export const account = new Account(client);
export const avatars = new Avatars(client);
