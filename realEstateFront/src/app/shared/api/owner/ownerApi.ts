import type { IOwner } from "../../../entities/IOwner";
import ownerService from "./ownerService";

export const ownerApi = () => {
  const getOwner = async (id:string) => {
    const res = await ownerService.getOwner(id);
    return res;
  };

 const insertOwner = async (owner: IOwner) => {
    const res = await ownerService.insertOwner(owner);
    return res;
  };

  return { getOwner, insertOwner };
};
