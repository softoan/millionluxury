/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IPropertyTrace } from "../../../entities/IPropertyTrace";
import { Error, Success } from "../../alert/Alert";
import api from "../axiosConfig";

const propertyTraceService = {
  getPropertyTrace: async (id?: string): Promise<IPropertyTrace[]> => {
    try {
      const res = await api.get<IPropertyTrace[]>(
        `/PropertyTraces/${id}`
      );
      return res.data;
    } catch (error: any) {
      return [];
    }
  },

  insertPropertyTrace: async (trace: IPropertyTrace): Promise<IPropertyTrace | null> => {
    try {
      const res = await api.post<IPropertyTrace>(`/PropertyTraces`, trace);
      Success("Éxito", "Historial creado correctamente");
      return res.data;
    } catch (error: any) {
      Error("Error", "No se pudo crear el historial");
      return null;
    }
  },
};

export default propertyTraceService;
