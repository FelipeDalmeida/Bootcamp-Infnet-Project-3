import { api } from "./api";
import type { User } from "../../types/types";

type CreateAccountInput = {
  nome: string;
  email: string;
  password: string;
};

type CreateAccountOutput = {
  success: true;
  accessToken?: string;
  user?: User;
};

export async function register(
  createAccountInput: CreateAccountInput
): Promise<CreateAccountOutput> {
  const response = await api.post("/auth/register", createAccountInput);
  return response.data;
}