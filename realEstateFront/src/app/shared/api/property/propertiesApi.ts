import type { IProperty } from "../../../entities/IProperty";
import propertiesService from "./propertyService";

export const propertiesApi = () => {
  const getProperties = async () => {
    const res = await propertiesService.getProperty();
    return res;
  };
  const insertProperty = async (property: IProperty) => {
    const res = await propertiesService.insertProperty(property);
    return res;
  };

  return { getProperties, insertProperty };
};
