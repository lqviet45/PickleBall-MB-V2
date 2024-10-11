import React from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import {router} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {AddDotToNumber} from "@/lib/helper";

interface ProductCardVerticalProps {
    id: string;
    imageUrl: string;
    imageCustomStyle?: string;
    description: string;
    productName: string;
    quantity: number;
    price: number;
}
const ProductCardVertical = (
    { id, imageUrl, imageCustomStyle, description, productName, quantity, price }
        : ProductCardVerticalProps) => {
    return (
        <View className="m-3 w-[44%] rounded-xl bg-base">
            <TouchableOpacity
                onPress = {() => {
                    router.push({
                        pathname: `(shop)/[id]`,
                        params: {id: id}
                    });
                }}
                className={"relative rounded-2xl"}
            >
                <Image
                    source={{uri: imageUrl}}
                    className={"w-full h-48 rounded-2xl " + {imageCustomStyle}}
                    resizeMode={'cover'}>
                </Image>
                <View className={"py-1 px-1.5 absolute bottom-0 rounded-b-xl bg-black/40 w-full"}>
                    <View className={"bg-white px-1.5 flex-row self-start"}>
                        <Text className={"text-yellow-500"}>Còn lại <Text className={"font-bold text-yellow-500 text-md"}> {quantity}</Text></Text>
                    </View>
                    <Text className={"text-white font-bold text-lg"}>{productName}</Text>
                    <Text className={"text-white font-bold text-2xl italic"}>{AddDotToNumber(price)} Đ</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

export default ProductCardVertical;