import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.log("STREAM_API_KEY or ENV.STREAM_API_SECRET is missing ");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret); // this will be used for chat features
export const streamClient = new StreamClient(apiKey, apiSecret); // this will be used for video call

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData); // upsert means we can do both create and update the data
    console.log("Stream user upserted successfully:", userData);
  } catch (error) {
    console.error("Error upserting Stream user: ", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId); // upsert means we can do both create and update the data
    console.log("Stream user deleted successfully:", userId);
  } catch (error) {
    console.error("Error deleting the Stream user: ", error);
  }
};
