import React, {useEffect, useRef, useState} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import CourtCardVertical from "@/components/CourtCardVertical";
import ProductCardVertical from "@/components/ProductCardVertical";
import {axiosInstance} from "@/lib/axios";
import {Product} from "@/model/product";

const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const currentPage = useRef<number>(1);
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
        console.log(totalPages);
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
    }, [search, pageNumber]);
    return (
        <SafeAreaView className={"bg-white h-full p-2"}>
            <View className={"border-2 border-gray-100 h-16"}>
                <Text className={"text-center text-3xl"}>
                    Future search bar
                </Text>
            </View>
            {/*Filter options*/}
            <View className={"bg-base flex-row justify-between items-center h-10"}>
                <Text className={"text-center text-sm border-r-2 border-gray-100 w-[24%]"}>
                    Hot deals!
                </Text>
                <Text className={"text-center text-sm border-r-2 border-gray-100 w-[24%]"}>
                    Mới nhất
                </Text>
                <Text className={"text-center text-sm border-r-2 border-gray-100 w-[24%]"}>
                    Bán chạy
                </Text>
                <Text className={"text-center text-sm w-[24%]"}>
                    Giá {"<>"}
                </Text>
            </View>
            <FlatList
                className={""}
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
                            />
                        )}
                keyExtractor={(item) => item.id}
                ListFooterComponent={() => RenderPaging(totalPages)}
            />
            {/*Hollow view*/}
            <View className={"h-4"}/>
        </SafeAreaView>
    );
};

export default Shop;