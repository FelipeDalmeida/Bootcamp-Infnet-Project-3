import { Message } from "../../types/types";
import { api } from "./api";


export async function postMessage(content:string): Promise<Message> {
  const response = await api.post("/message",{content});
  return response.data;
}