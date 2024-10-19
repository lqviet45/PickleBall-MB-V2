import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Button } from "react-native-paper";
import {StyleSheet, ScrollView, Alert, View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import OrderTable from "@/components/OrderTable";
import PaymentFieldTable from "@/components/PaymentFieldTable";
import {axiosInstance} from "@/lib/axios";
import {router, useLocalSearchParams} from "expo-router";
import {useGlobalContext} from "@/context/GlobalProvider";

const ResultScreen = () => {
    const [responseCode, setResponseCode] = useState<string>();
    const [error, setError] = useState<string>();

    const {setCart} = useGlobalContext();
    const route = useRoute();
    const {
        orderCode,
        customerId,
        code,
        id,
        cancel,
        status,
        isBooking
        } = useLocalSearchParams<{
        orderCode: string;
        customerId: string;
        code: string;
        id: string;
        cancel: string;
        status: string;
        isBooking: string;
    }>();


    useEffect(() => {
        (async () => {
            try {
                if (!orderCode) return;
                let params = {
                    Id: id,
                    Code: code,
                    Cancel: cancel,
                    Status: status,
                    OrderCode: orderCode,
                    CustomerId: customerId
                }
                console.log("orderCode", orderCode);
                console.log("customerId", customerId);
                console.log("code", code);
                console.log("id", id);
                console.log("cancel", cancel);
                console.log("status", status);
                console.log("isBooking", isBooking);
                const url = isBooking === "yes" ?
                    "/payment-return" : "/payment-product-return";
                const res = await axiosInstance.get(
                    url,
                    {
                        params: params
                    }
                );
                setResponseCode(status);
                if (res.status === 200 && isBooking !== "yes") {
                    setCart([]);
                }
            } catch (error: any) {
                //Alert.alert(error.message);
                setError(error.message);
            }
        })();
    }, []);

    return (
            <SafeAreaView className={"h-[70%] w-[90%] rounded-2xl bg-white m-auto border-gray-100 border-2"}>
                {/*<OrderTable data={order} />*/}
                {/*<PaymentFieldTable data={(order as any)?.webhook_snapshot?.data} />*/}
                {responseCode !== "PAID" ? (
                    <Text className={"m-auto text-center text-3xl text-red-500 font-bold"}>
                        Thanh toán bị hủy bỏ
                    </Text>
                )
                : (
                    <Text className={"m-auto text-center text-3xl text-green-400 font-bold"}>
                        Thanh toán {isBooking !== "yes" ? "đơn hàng" : "sân"} thành công!
                    </Text>
                    )}
                <Button mode="text" onPress={() => {
                    if (isBooking !== "yes") {
                        responseCode !== "PAID" ?
                            router.push("(payment)/OrderScreen")
                        : router.replace("(shop)/shop")
                    }
                    router.push("(order)/order")

                }} style={styles.button}>
                    <Text className={"text-blue text-xl"}>
                    Quay về
                    </Text>
                </Button>
            </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "95%",
        alignSelf: "center",
        height: "100%"
    },
    innerContainer: {
        gap: 20,
        height: "70%"
    },
    button:{
        width: 200,
        alignSelf: "center",
        margin: 20

    }
});

export default ResultScreen;