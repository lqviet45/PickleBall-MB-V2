import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {router} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

interface CourtCardVerticalProps {
    courtId: string;
    courtImage: string;
    imageCustomStyle?: string;
    rating: number;
    courtName: string;
    time: string;
}

const CourtCardVertical = ({ courtId, courtImage, imageCustomStyle, rating, courtName, time }: CourtCardVerticalProps) => {

    return (
        <View className="m-3 w-[44%] rounded-2xl">
            <TouchableOpacity
                onPress = {() => {
                    router.push({
                        pathname: `(court)/[id]`,
                        params: {id: courtId}
                    });
                }}
                className={"relative rounded-2xl"}
            >
                <Image
                    source={{uri: courtImage}}
                    className={"w-full h-48 rounded-2xl " + {imageCustomStyle}}
                    resizeMode={'cover'}>
                </Image>
                <View className={"py-1 px-1.5 absolute bottom-0 rounded-b-2xl bg-black/30 w-full"}>
                    <View className={"rounded-3xl bg-white/70 px-1.5 flex-row self-start"}>
                        <Text className={""}><Ionicons name="star" size={12} color="yellow"/> {rating} </Text>
                    </View>
                    <Text className={"text-white font-bold text-lg"}>{courtName}</Text>
                    <Text className={"text-white"}>Thời gian: {time}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CourtCardVertical;