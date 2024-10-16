import React, {useEffect, useRef, useState} from 'react';
import {useGlobalContext} from "@/context/GlobalProvider";
import {Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Text} from "react-native-paper"
import * as Linking from "expo-linking";
import {createPaymentLink} from "@/lib/paymentApi";
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import {axiosInstance} from "@/lib/axios";
import {AddDotToNumber} from "@/lib/helper";
import {router} from "expo-router";

const OrderScreen = () => {
    const {cart,userId, setCart} = useGlobalContext();
    const paymentOpts = useRef<string>("cash");

    const HandlePayment = async () => {
        if (cart.length === 0) return;
        const initial = await Linking.getInitialURL();
        console.log("initial linking", initial)
        let products= cart.map(
            (item) => {
                return {
                    productId: item.id,
                    quantity: item.selectedQuantity
                }});

        let res = await axiosInstance.post("/buy-product",
            {
                userId: userId!,
                courtGroupId: "4ff652d7-4015-4c6f-885e-08dc96754fb9",
                description: "Mua hàng",
                products: products,
                returnUrl: "pickle-ball:///(payment)/ResultScreen?customerId=" + userId,
                cancelUrl: "pickle-ball:///(payment)/ResultScreen?customerId=" + userId,
            });
        console.log(res.data);
        Linking.canOpenURL(res.data.checkoutUrl).then(supported => {
            if (supported) {
                Linking.openURL(res.data.checkoutUrl);
            } else {
                console.log("Don't know how to open URI: " + res.data.checkoutUrl);
            }
        });

    }

    return (
        <SafeAreaView className={"h-full bg-white"}>
            <View className={"p-2 mt-4"}>
                <Text className={"py-2 mb-2 text-3xl font-plight border-b-2 border-gray-50"}>
                    Chi tiết giỏ hàng
                </Text>
                <ScrollView className={"px-3 "}>
                    {cart.map((item, index) => (
                        <View key={index}
                              className={"flex-row my-3 border-b-2 border-gray-50"}>
                            <Image
                                source={{uri: item.imageUrl}}
                                style={{width: 50, height: 50}}
                            />
                            <View className={"w-[50%] ml-2"}>
                                <Text className={"text-md font-bold"}>
                                    {item.productName}
                                </Text>
                                <Text className={"text-sm text-gray-500 italic"}>
                                    {item.description}
                                </Text>
                            </View>
                            <View>
                                <Text className={"mb-2"}>
                                    {AddDotToNumber(item.price)}đ
                                </Text>
                                <Text className={"text-green-800"}>
                                    số lượng
                                    <Text className={"font-bold text-black"}>
                                        {" "}
                                        {item.selectedQuantity}
                                    </Text>
                                </Text>
                            </View>
                            <View className={"mx-auto my-auto"}>
                                <TouchableOpacity
                                    onPress={() => {
                                        const newCart = cart.filter((_, i) => i !== index);
                                        setCart(newCart);
                                    }}
                                >
                                    <Text className={"text-red-500"}>
                                        Xóa
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View className={"relative bottom-1"}>
                    {cart.length !== 0 ? (
                        <>
                            <View className={"w-full border-y-2 border-gray-100 mt-2"}>
                                <View className={"flex-row"}>
                                    <Text className={"w-[60%] text-lg font-bold"}>
                                        Phí vận chuyển:
                                    </Text>
                                    <Text className={"w-[40%] italic text-lg"}>
                                        0đ
                                    </Text>
                                </View>
                                <View className={"flex-row"}>
                                    <Text className={"w-[60%] text-lg font-bold"}>
                                        Tổng cộng:
                                    </Text>
                                    <Text className={"w-[40%] italic text-lg"}>
                                        {AddDotToNumber(cart.reduce((acc, item) => acc + item.price * item.selectedQuantity, 0))}đ
                                    </Text>
                                </View>
                            </View>
                            <View className={"w-full"}>
                                <Text className={"text-lg font-bold"}>
                                    Phương thức thanh toán
                                </Text>
                                <View className={"flex-row mt-1"}>
                                    <TouchableOpacity className={"w-[50%] border-2 border-gray-50 py-3"}>
                                        <Text className={" text-gray-700 text-xl text-center "}>
                                            Tiền mặt
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className={"w-[50%] border-2 border-gray-50 py-3"}>
                                        <Text className={" text-gray-700 text-xl text-center "}>
                                            Bank
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    ) : (
                        <View className={"h-60 w-full"}>
                            <Text className={"text-2xl text-gray-500 my-auto text-center"}>
                                Giỏ hàng trống...
                            </Text>
                        </View>
                    )}
                </View>
            </View>
            <View className={"absolute bottom-0 h-16 bg-white border-t-2 border-gray-50"}>
                <View className={"flex-row h-full"}>
                    <TouchableOpacity
                        onPress={() => {
                            router.back();
                        }}
                        className={'w-[65%] bg-base'}>
                        <Text className={"text-lg text-white font-bold m-auto"}>
                            Mua thêm sản phẩm
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={HandlePayment}
                        className={"w-[35%] bg-secondary"}>
                        <Text className={"font-bold text-xl text-white m-auto"}>
                            Thanh toán
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default OrderScreen;