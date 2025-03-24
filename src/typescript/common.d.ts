import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    showNotification?: boolean;
  }
}
