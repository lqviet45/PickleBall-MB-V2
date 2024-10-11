import React, {useEffect, useState} from 'react';
import {router, useLocalSearchParams} from "expo-router";
import {axiosInstance} from "@/lib/axios";
import {Product} from "@/model/product";
import {View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import {AddDotToNumber} from "@/lib/helper";

const ProductDetail = () => {
    const {id} = useLocalSearchParams<{id: string}>();
    const [product, setProduct] = useState<Product>();
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchProduct = async () => {
        const axiosResponse = await axiosInstance.get(`products/${id}`);
        setProduct(axiosResponse.data.value);
        setIsLoaded(true);
    }

    const HandleBuying = async () => {
        console.log("Buying");
    }

    const HandleAddToCart = async () => {
        console.log("Add to cart");
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        !isLoaded ? (
            <SafeAreaView className="h-full w-full">
                <View className="items-center h-full justify-center">
                    <ActivityIndicator size="large" color="black"/>
                    <Text className="text-center text-base font-pmedium text-lg">
                        Loading...
                    </Text>
                </View>
            </SafeAreaView>
        ) : (
            <SafeAreaView className={"h-full"}>
                <View>
                    <Image
                        source={{uri: product?.imageUrl}}
                        className={"w-full h-72"}
                    />
                    <View className="absolute top-5 left-5">
                        <TouchableOpacity
                            onPress={() => router.back()}
                        >
                            <Ionicons
                                name={'chevron-back'}
                                size={40}
                                color={'black'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View className={"p-5"}>
                        <Text className={"text-4xl font-bold"}>
                            {product?.productName}
                        </Text>
                        <Text className={"text-md italic text-gray-700"}>
                            Còn lại <Text className={"font-bold italic"}>{product?.quantity}</Text> sản phẩm
                        </Text>
                        <Text className={"text-md font-bold text-yellow-500 my-2"}>
                            đ<Text className={"text-3xl"}>{AddDotToNumber(product!.price)}</Text>
                        </Text>
                        <Text className={"text-lg"}>
                            {product?.description}
                        </Text>
                    </View>
                </ScrollView>
                {/*Footer*/}
                <View className={"absolute bottom-0"}>
                    <View className={"flex-row h-14"}>
                        <TouchableOpacity
                            onPress={HandleAddToCart}
                            className={"h-full w-[40%] bg-base flex-row justify-center items-center"}>
                            <Ionicons name={"bag-add-outline"} size={36} color={"white"}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={HandleBuying}
                            className={"bg-secondary-200 h-full w-[60%] justify-center"}>
                            <Text className={"w-full text-2xl font-plight text-white text-center"}>
                                Mua ngay
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    )
}

    export default ProductDetail;