import { User } from "../../types/types";
import { api } from "./api";


export type Output = User & {success:boolean} | {success:boolean};

export async function patchMyself(data:Partial<User>): Promise<Output> {
  const response = await api.patch("/users",data);

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