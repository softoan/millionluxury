/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IOwner } from "../../../entities/IOwner";

import { Error, Success } from "../../alert/Alert";
import api from "../axiosConfig";

const ownerService = {
  getOwner: async (id: string): Promise<IOwner | IOwner[]> => {
    try {
      const res = await api.get<IOwner | IOwner[]>(
        `/Owners${id ? `/${id}` : ""}`
      );
      return res.data;
    } catch (error: any) {
      return { idOwner: "", name: "", address: "", photo: "", birthday: "" };
    }
  },

    insertOwner: async (owner: IOwner): Promise<IOwner | null> => {
    try {
      const res = await api.post<IOwner>(`/Owners`, owner);
      Success("Éxito", "Propietario creado correctamente");
      return res.data;
    } catch (error: any) {
      Error("Error", "No se pudo crear el propietario");
      return null;
    }
  },

};

export default ownerService;
