import React, {useEffect, useRef, useState} from 'react';
import {Animated, View, Text, TouchableOpacity, ScrollView, Image, Alert, FlatList} from "react-native";
import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {useGlobalContext} from "@/context/GlobalProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import CourtCardVertical from "@/components/CourtCardVertical";
import {axiosInstance} from "@/lib/axios";
import {CourtGroup} from "@/model/courtGroup";
import {StatusBar} from "expo-status-bar";

const Home = () => {
    const {userFullName} = useGlobalContext();

    const [isLoaded, setIsLoaded] = useState(false);
    const [courtGroup, setCourtGroup] = useState<CourtGroup[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isInit, setIsInit] = useState(true);
    const [isScrollToTop, setIsScrollToTop] = useState(true);
    const currentPage = useRef<number>(1);
    const refresh = useRef<boolean>(false);
    const pageSize: number = 10;
    const scrollY = new Animated.Value(0);

    const translateY = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [0, -200],
        extrapolate: 'clamp'
    });
    const fetchCourtGroup = async (pageNumber: number) => {
        try {
            const data = await axiosInstance.get('court-groups', {
                params: {
                    pageSize: pageSize,
                    pageNumber: pageNumber
                }
            });
            setCourtGroup(data.data.value.items);
        } catch (error) {
            Alert.alert('Error', 'Failed to get court group');
        }
    }

    useEffect(() => {
        if (isInit) {
            fetchCourtGroup(currentPage.current)
                .then(() => setIsLoaded(true))
                .catch(e => console.log(e));
            setIsInit(false);
        }
    }, []);

    return (
        <SafeAreaView className={"bg-white h-full"}>

            <Animated.View
                style={{
                    transform: [
                        {
                            translateY: translateY
                        }
                    ],
                    backgroundColor: 'white',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    zIndex: 1000,
                    top: 14,
                    left: 0,
                    right: 0,
                    position: 'absolute',
                    padding: 10,
                }}
            >
                {/*Welcome view*/}
                <View className="flex-row justify-between pt-3 px-2">
                    <Text className="text-xl">Xin chào, {userFullName}</Text>
                    <Ionicons name="notifications-outline"
                              size={30} color="black" onPress={() => router.push('notification')}/>
                </View>
                {/*Played time and Wallet*/}
                <View className="flex-row justify-between px-2 pt-1">
                    <View className="p-2 rounded-2xl bg-[#001A27] w-[48%]">
                        <Ionicons name="time" size={28} color="white"/>
                        <View className={"flex-row justify-between"}>
                            <Text className={"text-white"}>Played time</Text>
                            <Text className={"text-white"}>420H</Text>
                        </View>
                    </View>
                    <View className="p-2 rounded-2xl bg-[#e6f8b3] w-[48%]">
                        <TouchableOpacity onPress={() => router.push('(users)/wallet/')}>
                            <Ionicons name="wallet-outline" size={28} color="black"/>
                            <View className="flex-row justify-between">
                                <Text>Wallet</Text>
                                <Text className={"text-gray-500"}>Nhấn để xem ví</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*  Booked Court  */}
            </Animated.View>


            <Animated.FlatList
                className="bg-white pt-28"
                data={courtGroup}
                numColumns={2}
                keyExtractor={(item) => item.id}
                onScroll={(e) => {
                    // e is an event that contains various data
                    // save scroll y position
                    scrollY.setValue(e.nativeEvent.contentOffset.y);
                }}
                renderItem={({item}) => (
                    <>
                        <CourtCardVertical
                            courtId={item.id}
                            courtImage={(item.medias !== undefined && item.medias[0] !== undefined)
                                ? item.medias[0].mediaUrl
                                : "https://www.thespruce.com/thmb/1J6"}
                            rating={4.5}
                            courtName={item.name}
                            time={'08:00 - 16:00'}
                        />
                    </>
                )}

            />

            <StatusBar backgroundColor={'#FFFFFF'} style="dark"/>
        </SafeAreaView>
    );
};

export default Home;