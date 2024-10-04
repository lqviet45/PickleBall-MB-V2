import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {router} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {AddDotToNumber} from "@/lib/helper";

interface CourtCardHorizontalProps {
    courtId: string;
    courtImage: string;
    imageCustomStyle?: string;
    rating?: number;
    courtName: string;
    price: number;
}

const CourtCardHorizonal = ({ courtId, courtImage, imageCustomStyle, rating, courtName, price }: CourtCardHorizontalProps) => {

    return (
        <View className={"rounded-2xl m-1 px-2"}>
            <TouchableOpacity
                onPress = {() => {
                    console.log("courtId", courtId);
                    router.push({
                        pathname: `/(court)/${courtId}`
                    });
                    }
                }
                className={"flex-row justify-between"}
            >
                <View className="bg-[#F5F5F5] w-[40%] rounded-l-2xl">
                    <Image
                        source={{uri: courtImage}}
                        className={"w-full h-48 rounded-l-2xl " + {imageCustomStyle}}
                        resizeMode={'cover'}>
                    </Image>
                </View>
                <View className="bg-[#F5F5F5] w-[58%] flex-1 rounded-r-2xl self-auto">
                        {/*Heading*/}
                        <View className={"rounded-3xl px-1.5 flex-row justify-between m-2"}>
                            <Text className={"font-pbold font-bold text-2xl"}>{courtName}</Text>
                            {/*Bookmark*/}
                            {/*<TouchableOpacity className={"mt-0.5"}>*/}
                            {/*    <Ionicons name={"heart"} size={26} color={"red"}/>*/}
                            {/*</TouchableOpacity>*/}
                        </View>
                        {/*Content*/}
                        <View className={"p-1.5 flex-col justify-between mx-2 mt-1"}>
                            <Text className={"text-base"}>This is the description of the court.</Text>
                        </View>
                        <View className={"absolute bottom-1 p-1.5 flex-col justify-between mx-2 mt-1 w-full"}>
                            {/*Rating*/}
                            <View>
                                {rating != null ? <Text className={"text-base text-white self-start bg-yellow-500 px-2 rounded-2xl"}><Ionicons name="star" size={14} color="yellow"/> {rating} </Text> : <View></View>}
                            </View>
                            {/*Price*/}
                            <Text className={"text-black font-light text-2xl"}>
                                {AddDotToNumber(price)} Đ/hour
                            </Text>
                        </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CourtCardHorizonal;