import React, {useEffect, useRef, useState} from 'react';
import {Animated, View, Text, TouchableOpacity, Alert, FlatList} from "react-native";
import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {useGlobalContext} from "@/context/GlobalProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import CourtCardVertical from "@/components/CourtCardVertical";
import {axiosInstance} from "@/lib/axios";
import {StatusBar} from "expo-status-bar";

const Home = ({navigation} : any) => {
    const {userFullName, userId} = useGlobalContext();
    const [isLoaded, setIsLoaded] = useState(false);
    const [bookMarks, setBookMarks] = useState<any>([]);
    const [isInit, setIsInit] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const currentPage = useRef<number>(1);
    const isInitialMount = useRef(true);
    const pageSize: number = 10;
    const scrollY = new Animated.Value(0);

    const translateY = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [0, -300],
        extrapolate: 'clamp'
    });

    const onEndReached = async () => {
        try {
            if (isEnd || !isLoaded) return;
            currentPage.current = currentPage.current + 1;
            await fetchCourtGroup(currentPage.current);
        } catch (error) {
            console.log(error);
            Alert.alert('Error end reached!', error!.toString());
        }
    }

    const fetchCourtGroup = async (pageNumber: number) => {
        try {
            const data = await axiosInstance.get(`users/${userId}/bookmarks`, {
                params: {
                    pageSize: pageSize,
                    pageNumber: pageNumber
                }
            });

            if (data.data.value.items.length === 0) {
                setIsEnd(true);
                return;
            }
            if (isInit || isInitialMount.current) {
                setBookMarks(data.data.value.items);
                isInitialMount.current = false;
                setIsInit(false);
                return;
            }
            setBookMarks([...bookMarks, ...data.data.value.items]);
        } catch (error) {
            // @ts-ignore
            if(error.response.status === 404) {
                setIsEnd(true);
                return;
            }
            Alert.alert('Error fetchCourtGroup', error!.toString());
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            currentPage.current = 1;
            isInitialMount.current = true;
            fetchCourtGroup(currentPage.current)
                .then(() => isInitialMount.current = false)
                .catch(e => {console.log("home/useEffect/unsubscribe/fetchCourtGroup: ",e)});
        })

        if (isInit) {
            fetchCourtGroup(currentPage.current)
                .then(() => setIsLoaded(true))
                .catch(e => console.log("init: ",e));
            setIsInit(false);
        }
        return unsubscribe;
    }, [navigation]);

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
                    left: 0,
                    right: 0,
                    position: 'absolute',
                    paddingTop: 20,
                    paddingBottom: 10,
                    paddingHorizontal: 5
                }}
            >
                {/*Welcome to view*/}
                <View className="flex-row justify-between pt-3 px-2">
                    <Text className="text-xl">Xin chào, {userFullName}</Text>
                    <Ionicons name="notifications-outline"
                              size={30} color="black" onPress={() => router.push('notification')}/>
                </View>
                {/*Shop and Wallet*/}
                <View className="flex-row justify-between px-2 pt-1">
                    <View className="p-2 flex-row items-center justify-around rounded-2xl bg-base w-[48%]" >
                        <TouchableOpacity onPress={() => router.push('(shop)/shop')}>
                            <Ionicons name="bag-handle-outline" size={36} color="white"/>
                            <Text className={"text-white text-xl"}>Cửa hàng</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="p-2 rounded-2xl bg-[#e6f8b3] w-[48%]">
                        <TouchableOpacity onPress={() => router.push('(users)/(wallet)/')}>
                            <Ionicons name="wallet-outline" size={28} color="black"/>
                            <View className="flex-row justify-between">
                                <Text>Wallet</Text>
                                <Text className={"text-gray-500"}>Nhấn để xem ví</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>

            {/*  Booked Court  */}
            <View className={'flex-1'}>
                <FlatList
                    className="bg-white pt-28 flex-1 pb-6"
                    data={bookMarks}
                    numColumns={2}
                    initialNumToRender={pageSize}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0.1}
                    keyExtractor={(item) => item.id}
                    onScroll={(e) => {
                        // e is an event that contains various data
                        // save scroll y position
                        scrollY.setValue(e.nativeEvent.contentOffset.y);
                    }}
                    renderItem={({item}) => (
                            <CourtCardVertical
                                courtId={item.courtGroup.id}
                                courtImage={(item.courtGroup.medias !== undefined && item.courtGroup.medias[0] !== undefined)
                                    ? item.courtGroup.medias[0].mediaUrl
                                    : "https://www.thespruce.com/thmb/1J6"}
                                rating={4.5}
                                courtName={item.courtGroup.name}
                                time={'08:00 - 16:00'}
                            />
                    )}

                    ListHeaderComponent={() => {
                        return (
                            <View className="flex-row justify-center pt-5">
                                <Text className="text-xl">Bookmarked courts</Text>
                            </View>
                        );
                    }}

                    ListFooterComponent={() => {
                        return (
                            <>
                                <View className="flex-row justify-center pt-5">
                                    {!isEnd && bookMarks.length !== 0 && (
                                        <Text className="text-gray-500 text-center">Loading...</Text>
                                    )}
                                    {isEnd && bookMarks.length !== 0 && (
                                        <Text className="text-gray-500 text-center">No more court</Text>
                                    )}
                                </View>
                                <View className="flex-row justify-center pt-24 pb-6">
                                </View>
                            </>
                        );
                    }}
                />
            </View>
            <StatusBar backgroundColor={'#FFFFFF'} style="dark"/>
        </SafeAreaView>
    );
};


export default Home;