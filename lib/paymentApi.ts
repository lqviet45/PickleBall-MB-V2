//import {SERVER_URL, VIETQR_URL} from "@env"
import {axiosInstance} from "@/lib/axios";
import axios from "axios";

export const createPaymentLink = async (formValue: {
    userId: string;
    courtGroupId: string;
    description: string;
    products: [
        {
            productId: string;
            quantity: number;
        }
    ];
    returnUrl: string;
    cancelUrl: string;
}) => {
    try {
        console.log(process.env.SERVER_URL);

        const response = await axiosInstance.post(
            `/buy-product`,
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
            url: process.env.VIETQR_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}