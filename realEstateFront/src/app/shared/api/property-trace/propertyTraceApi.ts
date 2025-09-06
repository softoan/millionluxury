import propertyTraceService from "./propertyTraceService";
import type { IPropertyTrace } from "../../../entities/IPropertyTrace";

export const propertyTracesApi = () => {
  const getPropertyTrace = async (id?: string) => {
    return await propertyTraceService.getPropertyTrace(id);
  };

  const insertPropertyTrace = async (trace: IPropertyTrace) => {
    return await propertyTraceService.insertPropertyTrace(trace);
  };
  return { getPropertyTrace, insertPropertyTrace };
};
