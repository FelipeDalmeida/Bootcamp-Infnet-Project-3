import { Message } from "../../types/types";
import { api } from "./api";


export async function getMessages(): Promise<Message[]> {
  const response = await api.get("/message");
  const messages = response.data;
  return messages;
}