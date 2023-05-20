
import { api } from "./api";

type RequestEmailVerificationCodeOutput = {
  success: boolean;
};

export async function requestEmailVerificationCode(id:any): Promise<RequestEmailVerificationCodeOutput> {
  const response = await api.post<RequestEmailVerificationCodeOutput>(
    "/auth/email-verification-code",
    {id}
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