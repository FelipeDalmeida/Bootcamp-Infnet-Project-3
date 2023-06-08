
import { api } from "./api";

export type VerifyEmailInput = string;
export type VerifyEmailOutput = { success: boolean };

export async function verifyEmail(code: string,id:any) {
  const response = await api.post<VerifyEmailOutput>("/auth/verify-email", {
    code,
    id
  });
  if(response.data.success){
    return {
      ...response.data,
      success: true
    }
  }

  return {
   success: false
  }
}