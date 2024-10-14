import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { StyleSheet, ScrollView, Alert } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import OrderTable from "@/components/OrderTable";
import PaymentFieldTable from "@/components/PaymentFieldTable";
import {axiosInstance} from "@/lib/axios";
import {router} from "expo-router";

const ResultScreen = () => {
    const [order, setOrder] = useState();
    const route = useRoute();
    useEffect(() => {
        (async () => {
            try {
                let orderCode = (route as any).params.orderCode;
                if (!orderCode) return;
                let res = await axiosInstance({
                    method: "GET",
                    url: `/api/orders/${orderCode}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (res.data.error === undefined) throw new Error("Không thể kết nối đến server");
                if (res.data.error !== 0) throw new Error(res.data.message);
                console.log(res);
                setOrder(res.data);
            } catch (error: any) {
                Alert.alert(error.message);
            }
        })();
    }, []);

    return (
        <ScrollView
            bounces={false}
            alwaysBounceVertical={false}
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <SafeAreaView style={styles.innerContainer}>
                <OrderTable data={order} />
                <PaymentFieldTable data={(order as any)?.webhook_snapshot?.data} />
            </SafeAreaView>
            <Button mode="text" onPress={() => {
                router.push("(payment)/OrderScreen");
            }} style={styles.button}> Quay về trang demo</Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "95%",
        alignSelf: "center",
    },
    innerContainer: {
        gap: 20,
    },
    button:{
        width: 200,
        alignSelf: "center",
        margin: 20
    }
});

export default ResultScreen;