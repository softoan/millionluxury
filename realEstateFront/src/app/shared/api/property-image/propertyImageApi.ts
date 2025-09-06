import propertyImageService from "./propertyImageService";
import type { IPropertyImage } from "../../../entities/IPropertyImage";

export const propertyImagesApi = () => {
  const getPropertyImage = async (id?: string) => {
    return await propertyImageService.getPropertyImage(id);
  };

  const insertPropertyImage = async (image: IPropertyImage) => {
    return await propertyImageService.insertPropertyImage(image);
  }; 
  return { getPropertyImage, insertPropertyImage};
};
