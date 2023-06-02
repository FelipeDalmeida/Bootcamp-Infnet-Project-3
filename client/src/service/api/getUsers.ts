import { User } from "../../types/types";
import { api } from "./api";


export async function getUsers(): Promise<User[]> {
  const response = await api.get("/users");
  const users = response.data;
  return users;
}