/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IPropertyImage } from "../../../entities/IPropertyImage";
import { Error, Success } from "../../alert/Alert";
import api from "../axiosConfig";

const propertyImageService = {
  getPropertyImage: async (id?: string): Promise<IPropertyImage | null> => {
    try {
      const res = await api.get<IPropertyImage>(
        `/PropertyImages${id ? `/${id}` : ""}`
      );
      return res.data;
    } catch (error: any) {
      //Error("Error", "No se pudieron obtener las imágenes");
      return null;
    }
  },

  insertPropertyImage: async (
    image: IPropertyImage
  ): Promise<IPropertyImage | null> => {
    try {
      const res = await api.post<IPropertyImage>(`/PropertyImages`, image);
      Success("Éxito", "Imagen de propiedad creada correctamente");
      return res.data;
    } catch (error: any) {
      Error("Error", "No se pudo crear la imagen");
      return null;
    }
  },
};

export default propertyImageService;
