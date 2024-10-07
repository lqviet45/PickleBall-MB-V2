import React from 'react';
import {FlatList, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import CourtCardVertical from "@/components/CourtCardVertical";
import CourtCardHorizonal from "@/components/CourtCardHorizontal";

const Shop = () => {
    return (
        <SafeAreaView className={"bg-white h-full p-2"}>
            <View className={"border-2 border-gray-100 h-16"}>
                <Text className={"text-center text-3xl"}>
                    Future search bar
                </Text>
            </View>
            <View className={" flex-row justify-around items-center h-10"}>
                <Text className={"text-center text-sm border-r-2 border-gray-100 px-2"}>
                    Tags
                </Text>
                <Text className={"text-center text-sm border-r-2 border-gray-100 px-2"}>
                    Tags
                </Text>
                <Text className={"text-center text-sm border-r-2 border-gray-100 px-2"}>
                    Tags
                </Text>
                <Text className={"text-center text-sm border-r-2 border-gray-100 px-2"}>
                    Tags
                </Text>
            </View>
            <ScrollView
            >
                <View className={"flex-row justify-around items-center"}>
                    <CourtCardVertical courtId={""} courtImage={"https://jillandally.com/cdn/shop/files/PinkStriped_250x.png?v=1686690177"} rating={5} courtName={"Product name"} time={"Product price"} />
                    <CourtCardVertical courtId={""} courtImage={"https://proxrpickleball.com/cdn/shop/files/PinkProductImage-01_500x500@3x.jpg?v=1700158303"} rating={5} courtName={"Product name"} time={"Product price"} />
                </View>
                <View className={"flex-row justify-around items-center"}>
                    <CourtCardVertical courtId={""} courtImage={"https://jillandally.com/cdn/shop/files/PinkStriped_250x.png?v=1686690177"} rating={5} courtName={"Product name"} time={"Product price"} />
                    <CourtCardVertical courtId={""} courtImage={"https://proxrpickleball.com/cdn/shop/files/PinkProductImage-01_500x500@3x.jpg?v=1700158303"} rating={5} courtName={"Product name"} time={"Product price"} />
                </View>
                <View className={"flex-row justify-around items-center"}>
                    <CourtCardVertical courtId={""} courtImage={"https://jillandally.com/cdn/shop/files/PinkStriped_250x.png?v=1686690177"} rating={5} courtName={"Product name"} time={"Product price"} />
                    <CourtCardVertical courtId={""} courtImage={"https://proxrpickleball.com/cdn/shop/files/PinkProductImage-01_500x500@3x.jpg?v=1700158303"} rating={5} courtName={"Product name"} time={"Product price"} />
                </View>
                <View className={"flex-row justify-around items-center"}>
                    <CourtCardVertical courtId={""} courtImage={"https://jillandally.com/cdn/shop/files/PinkStriped_250x.png?v=1686690177"} rating={5} courtName={"Product name"} time={"Product price"} />
                    <CourtCardVertical courtId={""} courtImage={"https://proxrpickleball.com/cdn/shop/files/PinkProductImage-01_500x500@3x.jpg?v=1700158303"} rating={5} courtName={"Product name"} time={"Product price"} />
                </View>
                <View className={"flex-row justify-around items-center"}>
                    <CourtCardVertical courtId={""} courtImage={"https://jillandally.com/cdn/shop/files/PinkStriped_250x.png?v=1686690177"} rating={5} courtName={"Product name"} time={"Product price"} />
                    <CourtCardVertical courtId={""} courtImage={"https://proxrpickleball.com/cdn/shop/files/PinkProductImage-01_500x500@3x.jpg?v=1700158303"} rating={5} courtName={"Product name"} time={"Product price"} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Shop;