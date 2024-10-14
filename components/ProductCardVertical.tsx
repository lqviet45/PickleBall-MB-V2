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
    handleCartClick?: () => void;
    handleBuyNowClick?: () => void;
}
const ProductCardVertical = (
    { id, imageUrl, imageCustomStyle, description
        , productName, quantity, price, handleCartClick, handleBuyNowClick }
        : ProductCardVerticalProps) => {
    return (
        <View className="m-2 w-[48%]">
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
                    className={"w-full h-48 " + {imageCustomStyle}}
                    resizeMode={'cover'}>
                </Image>
                <View className={"py-1 px-1.5 absolute bottom-0 bg-black/40 w-full"}>
                    <View className={"bg-white px-1.5 flex-row self-start"}>
                        <Text className={"text-yellow-500"}>Còn lại <Text className={"font-bold text-yellow-500 text-md"}> {quantity}</Text></Text>
                    </View>
                    <Text className={"text-white font-bold text-lg"}>{productName}</Text>
                    <Text className={"text-white font-bold text-2xl italic"}>{AddDotToNumber(price)} Đ</Text>
                    <Text className={"text-white font-plight text-md my-1"}>{description}</Text>
                </View>
            </TouchableOpacity>
            <View className={"flex-row"}>
                <TouchableOpacity
                    onPress={handleCartClick}
                    className={"w-[40%] bg-secondary-200 flex-row justify-center items-center"}>
                    <Ionicons name={"cart"} size={24} color={"#fff"}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleBuyNowClick}
                    className={"w-[60%] bg-orange-500 py-2 flex-row justify-center items-center"}>
                    <Text className={"text-white font-bold"}>
                        Mua ngay
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default ProductCardVertical;