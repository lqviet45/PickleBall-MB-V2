import {SERVER_URL, VIETQR_URL} from "@env"
import {axiosInstance} from "@/lib/axios";
import axios from "axios";

export const createPaymentLink = async (formValue: {
    userId: string;
    description: string;
    name: string;
    price: number;
    returnUrl: string;
    cancelUrl: string;
}) => {
    try {
        console.log(SERVER_URL);

        const response = await axiosInstance.post(
            `/orders`,
            formValue,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export const getBanksList = async () => {
    try {
        let res = await axios({
            method: "GET",
            url: VIETQR_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}