import { endpoints } from "@/api/endpoints";
import axiosInstance from "@/api/axiosInstance";
import { LoginPayload, SignUpPayload } from "@/@types/user.type";

/// User Signup function
export const userSignUp = async (body: SignUpPayload) => {
  const res = await axiosInstance.post(endpoints.auth.signup, body, {
    showNotification: true,
  });

  return res.data;
};

/// User Login function
export const userLogin = async (body: LoginPayload) => {
  const res = await axiosInstance.post(endpoints.auth.login, body, {
    showNotification: true,
  });

  return res.data;
};
