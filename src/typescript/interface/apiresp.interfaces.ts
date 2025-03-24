import { BaseApiResponse } from "./common.interface";
import { TContactListResponse } from "@/@types/contact.type";

export interface TContactListApiResponse extends BaseApiResponse {
  data: TContactListResponse;
}