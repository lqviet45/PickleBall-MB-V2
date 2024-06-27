import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {router} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

interface CourtCardHorizontalProps {
    courtId: string;
    courtImage: string;
    imageCustomStyle?: string;
    rating: number;
    courtName: string;
    time: string;
}

const CourtCardHorizonal = ({ courtId, courtImage, imageCustomStyle, rating, courtName, time }: CourtCardHorizontalProps) => {

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
                            <Text className={"font-mubold font-bold text-xl"}>{courtName}</Text>
                            <TouchableOpacity className={"mt-0.5"}>
                                <Ionicons name={"heart"} size={26} color={"red"}/>
                            </TouchableOpacity>
                        </View>
                        {/*Content*/}
                        <View className={"p-1.5 flex-col justify-between mx-2 mt-1"}>
                            <Text>asd ahsbd kasjdn badh kajsd nasd khaskdj  askjbdaw asbhda  ahsdba sdha</Text>
                        </View>
                        <View className={"absolute bottom-1 p-1.5 flex-col justify-between mx-2 mt-1"}>
                            <Text className={"self-start"}><Ionicons name="star" size={12} color="yellow"/> {rating} </Text>
                            <Text>Thời gian: {time}</Text>
                        </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CourtCardHorizonal;