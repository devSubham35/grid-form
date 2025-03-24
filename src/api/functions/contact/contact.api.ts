import { endpoints } from "@/api/endpoints";
import axiosInstance from "@/api/axiosInstance";
import { PaginatedPayload } from "@/typescript/interface/common.interface";
import { TContactListApiResponse } from "@/typescript/interface/apiresp.interfaces";

export const contactList = async (body: PaginatedPayload) => {
    const res = await axiosInstance.post<TContactListApiResponse>(
      endpoints.contact.contactList,
      body
    );
  
    return res.data;
  };