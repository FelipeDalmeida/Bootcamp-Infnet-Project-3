
import { User } from "../../types/types";
import { api } from "./api";


export type GetMyselfOutput = User;

export async function getMyself(): Promise<User> {
  const response = await api.get("/users/myself");
  return response.data;
}