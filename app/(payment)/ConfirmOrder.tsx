import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {axiosInstance} from "@/lib/axios";
import * as Linking from "expo-linking";
import {SafeAreaView} from "react-native-safe-area-context";

const ConfirmOrderPage = () => {
    const {
        userId,
        bookingId,
        name,
        description,
        price,
        returnUrl,
        cancelUrl
    } = useLocalSearchParams<{
        userId: string,
        bookingId: string,
        name: string,
        description: string,
        price: string,
        returnUrl: string,
        cancelUrl: string
    }>();
    console.log("useEffect/confirmOrderPage");
    const handleConfirmOrder = async () => {
        console.log("handleConfirmOrder");
        const axiosResponse = await axiosInstance.post(
            "/orders",
            {
                userId: userId,
                bookingId: bookingId,
                name: name,
                description: description,
                price: price,
                returnUrl: returnUrl,
                cancelUrl: cancelUrl
            }
        )
            .then((axiosResponse) => {
                console.log("axiosResponse.data: ",axiosResponse.data);
                Linking.canOpenURL(axiosResponse.data.checkoutUrl).then(supported => {
                    if (supported) {
                        Linking.openURL(axiosResponse.data.checkoutUrl);
                    } else {
                        console.log("Don't know how to open URI: " + axiosResponse.data.checkoutUrl);
                    }
                })
            })
            .catch(e => {
                console.log("err: ", e )
            })
    }
    useEffect((() => {
        console.log("useEffect/confirmOrderPage");
    }),[])
    return (
        <SafeAreaView className={"h-full w-full"}>
            <View className={"flex-col justify-center items-center m-auto h-[60%] w-[80%]"}>
                <Text className={"border-gray-100 border-b-2 text-2xl font-bold"}>
                    Xác nhận đơn hàng
                </Text>
                <Text className={"text-lg"}>
                    Tên : {name}
                </Text>
                <Text className={"text-lg"}>
                    Mô tả : {description}
                </Text>
                <TouchableOpacity
                    onPress={handleConfirmOrder}
                    className={"bg-green-500 p-2 rounded-lg mt-4"}>
                    <Text className={"text-white"}>
                        Xác nhận
                    </Text>
                </TouchableOpacity>
            </View>
            <View>

            </View>
        </SafeAreaView>
    );
};

export default ConfirmOrderPage;