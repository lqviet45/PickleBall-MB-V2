import React, {useEffect, useState} from 'react';
import {router, useLocalSearchParams} from "expo-router";
import {axiosInstance} from "@/lib/axios";
import {Product} from "@/model/product";
import {View, Text, Image, ScrollView, Modal, TouchableOpacity, ActivityIndicator} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import {AddDotToNumber} from "@/lib/helper";
import {useGlobalContext} from "@/context/GlobalProvider";

const ProductDetail = () => {
    const {id} = useLocalSearchParams<{id: string}>();
    const [product, setProduct] = useState<Product>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const {cart, setCart} = useGlobalContext();
    const fetchProduct = async () => {
        const axiosResponse = await axiosInstance.get(`products/${id}`);
        setProduct(axiosResponse.data.value);
        setIsLoaded(true);
    }

    const HandleBuying = (product: Product) => {
        product.selectedQuantity = 1;
        setCart([product]);
        router.push("(payment)/OrderScreen");
    }

    const HandleAddToCart = (product: Product) => {
        const existedItem = cart.find((i) => i.id === product.id);
        if (existedItem) {
            existedItem.selectedQuantity++;
            setCart([...cart]);
            return;
        }
        product.selectedQuantity = 1;
        setCart([...cart, product]);
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
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <View className={"h-full w-full "}>
                        <View
                            className={"m-auto h-56 bg-white rounded-2xl border-2 border-gray-50 items-center justify-around w-[80%]"}>
                            <Text className={"text-2xl text-center px-4 mb-5"}>
                                Đã thêm 1
                                <Text className={"text-red-500"}>
                                    {" "}{product?.productName}
                                </Text>
                                {" "}vào giỏ hàng
                            </Text>
                            <View className={"absolute bottom-0"}>
                                <View className={"flex-row w-full rounded-b-2xl bg-gray-100"}>
                                    <TouchableOpacity
                                        className={"w-[50%] bg-base px-2 py-4 rounded-bl-2xl"}
                                        onPress={() => router.replace("(payment)/OrderScreen")}
                                    >
                                        <Text className={"text-white text-xl w-full text-center"}>
                                            Xem giỏ hàng
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className={"w-[50%] px-2 py-4 rounded-br-2xl"}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text className={"text-xl w-full text-center "}>
                                            Tiếp tục mua
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
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
                            onPress={() => {
                                HandleAddToCart(product!)
                                setModalVisible(true)
                            }}
                            className={"h-full w-[40%] bg-base flex-row justify-center items-center"}>
                            <Ionicons name={"bag-add-outline"} size={36} color={"white"}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                HandleBuying(product!)
                            }}
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