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
    const [responseCode, setResponseCode] = useState<number>();
    const [error, setError] = useState<string>();

    const {setCart} = useGlobalContext();
    const route = useRoute();
    const {
        orderCode,
        customerId,
        code,
        id,
        cancel,
        status
        } = useLocalSearchParams<{
        orderCode: string;
        customerId: string;
        code: string;
        id: string;
        cancel: string;
        status: string;
    }>();
    console.log("orderCode", orderCode);
    console.log("customerId", customerId);
    console.log("code", code);
    console.log("id", id);
    console.log("cancel", cancel);
    console.log("status", status);

    useEffect(() => {
        (async () => {
            try {
                //let orderCode = (route as any).params.orderCode;
                // let res = await axiosInstance({
                //     method: "GET",
                //     url: `/api/orders/${orderCode}`,
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                // });
                if (!orderCode) return;
                let res = await axiosInstance.get(
                    "/payment-product-return",
                    {
                        params: {
                            Id: id,
                            Code: code,
                            Cancel: cancel,
                            Status: status,
                            OrderCode: orderCode,
                            CustomerId: customerId
                        }
                    }
                );

                console.log(res);
                setResponseCode(res.status);
                if (res.status === 200) {
                    setCart([]);
                }
            } catch (error: any) {
                Alert.alert(error.message);
                setError(error.message);
            }
        })();
    }, []);

    return (
            <SafeAreaView className={"h-[80%] my-auto"}>
                {/*<OrderTable data={order} />*/}
                {/*<PaymentFieldTable data={(order as any)?.webhook_snapshot?.data} />*/}
                {responseCode !== 200 ? (
                    <Text className={"m-auto text-center text-3xl text-red-500 font-bold"}>
                        {error}
                    </Text>
                )
                : (
                    <Text className={"m-auto text-center text-3xl text-green-400 font-bold"}>
                        Thanh toán đơn hàng thành công!
                    </Text>
                    )}
                <Button mode="text" onPress={() => {
                    responseCode !== 200 ? router.push("(payment)/OrderScreen")
                    : router.replace("(shop)/shop")
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