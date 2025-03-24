import { parseCookies } from "nookies";
import { baseApiUrl } from "../endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { BaseApiResponse } from "@/typescript/interface/common.interface";
import {
  globalCatchError,
  globalCatchSucess,
  globalCatchWarning,
} from "@/lib/functions/_helpers.lib";

const axiosInstance = axios.create({
  baseURL: baseApiUrl,
});

axiosInstance.interceptors.request.use((config) => {
  const cookies = parseCookies();

  const token = cookies[process.env.NEXT_APP_TOKEN_NAME!];
  if (token && !!config.headers) {
    /// config.headers["x-access-token"] = `${token}`;
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    
    if (res.config.showNotification) {
      if (res.status == 200) {
        globalCatchSucess(res);
      } else {
        globalCatchWarning(res?.data?.message);
      }
    }

    return res;
  },
  async (error: AxiosError<BaseApiResponse>) => {
    globalCatchError(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
