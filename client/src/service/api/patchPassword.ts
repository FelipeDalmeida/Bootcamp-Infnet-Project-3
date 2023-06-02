import { User } from "../../types/types";
import { api } from "./api";


export type Output = {success:boolean};

export async function patchPassword(data:{oldPassword:string,password:string}): Promise<Output> {
  const response = await api.patch("/users",data);

  if(response){
    return {
      success: true
    }
  }

  return {
   success: false
  }
}