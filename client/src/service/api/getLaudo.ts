import { api } from "./api";
import type { Pacientes } from "../../types/types";


 
  type GetLaudoOutput = {
    success: boolean;
    laudo?: any;
  };
  
  export async function getLaudo(
    id:number
  ): Promise<GetLaudoOutput> {
    const response = await api.get(`exames/laudos/${id}`);

    if(response.data.success){
      return {
        ...response.data,
        success: true
      }
    }
  
    return {
     success: false,
    }

  }