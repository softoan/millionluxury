/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IProperty } from "../../../entities/IProperty";

import { Error, Success } from "../../alert/Alert";
import api from "../axiosConfig";

const propertiesService = {
  getProperty: async (): Promise<IProperty[]> => {
    try {
      const res = await api.get<IProperty[]>(`/properties`);
      return res.data;
    } catch (error: any) {
      return [];
    }
  },

  insertProperty: async (property: IProperty): Promise<IProperty | null> => {
    try {
      const res = await api.post<IProperty>(`/properties`, property);
      Success("Éxito ", "Creación exitosa!!");
      return res.data;
    } catch (error: any) {
      console.error("Error al crear propiedad:", error);
      Error("Error", "Ups… parece que algo salió mal en la misión.");
      return null;
    }
  },
};

export default propertiesService;
