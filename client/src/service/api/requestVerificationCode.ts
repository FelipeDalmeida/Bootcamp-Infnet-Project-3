
import { api } from "./api";

type RequestEmailVerificationCodeOutput = {
  success: boolean;
};

export async function requestEmailVerificationCode(): Promise<RequestEmailVerificationCodeOutput> {
  const response = await api.post<RequestEmailVerificationCodeOutput>(
    "/auth/email-verification-code",
  );

  if(response){
    return {
      ...response.data,
      success: true
    }
  }

  return {
   success: false
  }

}