import { api } from "./api";
import type { Pacientes } from "../../types/types";


type Params = {
    offset?: number;
    limit?: number;
    search?: string | null;
    direction?: string;
    orderby?: string;
  };
  
  type GetPacientesOutput = {
    pacientesCount: number;
    listaPacientes: Pacientes[];
  };
  
  export async function getPacientes(
    params: Params = {}
  ): Promise<GetPacientesOutput> {
    const res = await api.get("/pacientes", {
      params,
    });
    const pacientes = res.data;
    return pacientes;
  }