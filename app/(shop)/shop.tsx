import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import CourtCardVertical from "@/components/CourtCardVertical";
import ProductCardVertical from "@/components/ProductCardVertical";
import {axiosInstance} from "@/lib/axios";
import {Product} from "@/model/product";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useGlobalContext} from "@/context/GlobalProvider";
import {router} from "expo-router";

const Shop = () => {
    const {cart, setCart} = useGlobalContext();

    const [products, setProducts] = useState<Product[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const currentPage = useRef<number>(1);
    const isSearching = useRef<boolean>(false);

    const PAGE_SIZE = 6;

    const RenderPagingButton = (index: number) => {
        return(
            index + 1 == currentPage.current ? (
                <TouchableOpacity
                    key={index}
                    className={"h-8 w-8 p-1 border-2 border-secondary bg-secondary-200 mx-1"}>
                    <Text className={"text-center font-bold w-full"}>{index + 1}</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() => {
                        setPageNumber(index + 1)
                        currentPage.current = index + 1
                    }}
                    key={index}
                    className={"h-8 w-8 p-1 border-2 border-secondary mx-1"}>
                    <Text className={"text-center font-bold w-full"}>{index + 1}</Text>
                </TouchableOpacity>
            )
        )
    }
    const RenderPaging = (totalPages: number) => {
        if (totalPages <= 4) return(
            <View className={"flex-row px-10 justify-center items-center"}>
                {[...Array(totalPages).keys()].map((index) => (
                    RenderPagingButton(index)
                ))}
            </View>
        );
        return(
            <View className={"flex-row px-10 justify-center items-center"}>
                <TouchableOpacity
                    onPress={() => setPageNumber(1)}
                    className={"h-8 w-8 p-1 border-2 border-base mx-1"}>
                    <Text className={"text-center font-bold w-full"}>{"<<"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setPageNumber(pageNumber - 1)}
                    className={"h-8 w-8 p-1 border-2 border-base mx-1"}>
                    <Text className={"text-center font-bold w-full"}>{"<"}</Text>
                </TouchableOpacity>
                <View
                    className={"h-8 w-8 p-1 border-2 border-gray-500 mx-1"}>
                    <Text className={"text-center text-gray-700 font-bold w-full"}>{pageNumber}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => setPageNumber(pageNumber + 1)}
                    className={"h-8 w-8 p-1 border-2 border-base mx-1"}>
                    <Text className={"text-center font-bold w-full"}>{">"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setPageNumber(totalPages)}
                    className={"h-8 w-8 p-1 border-2 border-base mx-1"}>
                    <Text className={"text-center font-bold w-full"}>{">>"}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const HandleAddToCart = (item: Product) => {
        const existedItem = cart.find((i) => i.id === item.id);
        if (existedItem) {
            existedItem.selectedQuantity++;
            setCart([...cart]);
            return;
        }
        item.selectedQuantity = 1;
        setCart([...cart, item]);
    }

    const HandleBuyNow = (item: Product) => {
        item.selectedQuantity = 1;
        setCart([item]);
        router.push("cart");
    }

    const fetchProducts = async () => {
        const axiosResponse = await axiosInstance.get(`products`, {
            params: {
                pageSize: PAGE_SIZE,
                pageNumber: pageNumber,
                search: search
            }
        });
        setProducts(axiosResponse.data.value.items);
        setTotalPages(axiosResponse.data.value.totalPages);
    }
    useEffect(() => {
        fetchProducts();
    }, [pageNumber]);
    return (
        <SafeAreaView className={"bg-white h-full p-2"}>
            {/*Search bar*/}
            <View className={"flex-row border-b-2 border-gray-50 bg-secondary px-2 pt-2 pb-4"}>
                <View className={" px-3 h-10 bg-white w-[80%]"}>
                    <TextInput
                        className=" flex-1 font-bold text-base"
                        value={search}
                        editable={true}
                        placeholder={"Nhập tên sản phẩm"}
                        placeholderTextColor={'#7b7b8b'}
                        onChangeText={e => setSearch(e)}
                        onBlur={() => {
                            isSearching.current = true;
                            fetchProducts();
                        }}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        router.push("(payment)/OrderScreen")
                    }}
                    className={"flex-row justify-center items-center w-[20%]"}>
                    <Ionicons name={"cart"} size={34} color={"#fff"}/>
                </TouchableOpacity>
            </View>
            {/*Filter options*/}
            <View className={" flex-row justify-between items-center bg-secondary h-10"}>
                <Text className={"text-center font-bold text-sm border-r-2 border-white w-[24%]"}>
                    Hot deals!
                </Text>
                <Text className={"text-center font-bold text-sm border-r-2 border-white w-[24%]"}>
                    Mới nhất
                </Text>
                <Text className={"text-center font-bold text-sm border-r-2 border-white w-[24%]"}>
                    Bán chạy
                </Text>
                <Text className={"text-center font-bold text-sm w-[24%]"}>
                    Giá {"<>"}
                </Text>
            </View>
            <FlatList
                className={""}
                // contentContainerStyle={styles.flatList}
                data={products}
                initialNumToRender={PAGE_SIZE}
                numColumns={2}
                renderItem={({item}) => (
                    <ProductCardVertical
                        id={item.id}
                        imageUrl={item.imageUrl}
                        description={item.description}
                        quantity={item.quantity}
                        productName={item.productName}
                        price={item.price}
                        handleCartClick={() => HandleAddToCart(item)}
                        handleBuyNowClick={() => HandleBuyNow(item)}
                    />
                        )}
                keyExtractor={(item) => item.id}
                ListFooterComponent={() => RenderPaging(totalPages)}
            />
            {/*Hollow view*/}
            <View className={"h-4"}/>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    flatList: {
        justifyContent: 'space-between',
        padding: 0,
        marginRight: 10,
    }
});

export default Shop;