import { toast } from "@/components/ui/use-toast";
import { isServer } from "@/utils";
import axios, { AxiosInstance } from "axios";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
let hasToastedUnauthorizedError = false;
let hasToastedNetworkError = false;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000 * 60 * 2, // 3 minutes
});

const getToken = () => {
  return localStorage.getItem("token");
};

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = getToken();

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    console.log(error.code);
    if (error.code === "ERR_NETWORK" && !hasToastedNetworkError) {
      hasToastedNetworkError = true;

      toast({
        title: "Network Error",
        variant: "destructive",
        description: "Please check your internet connection",
      });
    }

    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        if (!isServer() && !hasToastedUnauthorizedError) {
          hasToastedUnauthorizedError = true;

          toast({
            title: "Unauthorized",
            variant: "destructive",
            description: "Please login to continue",
          });

          setTimeout(() => {
            redirect("/");
          }, 500);
        }
      }
    }

    return Promise.reject(error);
  }
);
