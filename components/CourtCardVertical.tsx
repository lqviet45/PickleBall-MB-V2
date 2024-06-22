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
        <View className="bg-[#F5F5F5] m-3 w-[45%] rounded-2xl">
            <TouchableOpacity
                onPress = {() => {
                    router.push({
                        pathname: `(court)/[id]`,
                        params: {id: courtId}
                    });
                }
                }
            >
                <Image
                    source={{uri: courtImage}}
                    className={"w-full h-48 rounded-2xl " + {imageCustomStyle}}
                    resizeMode={'cover'}>
                </Image>
                <View className={"m-2 absolute bottom-1"}>
                    <View className={"rounded-3xl bg-white px-1.5 flex-row self-start"}>
                        <Text className={""}><Ionicons name="star" size={12} color="yellow"/> {rating} </Text>
                    </View>
                    <Text>{courtName}</Text>
                    <Text>Thời gian: {time}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CourtCardVertical;