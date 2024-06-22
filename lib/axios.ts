import axios, {AxiosInstance} from "axios";
import {useGlobalContext} from "@/context/GlobalProvider";

export const axiosInstance = axios.create({
  baseURL: "https://pickleballapp.azurewebsites.net/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosInstanceAuth = (token: string) => {
    return axios.create({
        baseURL: "https://pickleballapp.azurewebsites.net/api",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}