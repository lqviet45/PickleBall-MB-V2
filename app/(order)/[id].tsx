import React, {useState} from 'react';
import {router, useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, Text, View} from "react-native";
import {Booking} from "@/model/booking";
import {CourtGroup} from "@/model/courtGroup";
import Ionicons from "@expo/vector-icons/Ionicons";

const BookingDetail = () => {
    let {id} = useLocalSearchParams<{id: string}>();
    let [booking, setBooking] = useState<Booking>({
        id: '',
        courtYardId: '',
        courtGroupId: '',
        userId: '',
        dateId: '',
        numberOfPlayers: 0,
        bookingStatus: 1,
        createdOnUtc: new Date(),
        modifiedOnUtc: new Date(),
        courtGroup: {
            id: '',
            userId: '',
            wardId: '',
            name: '',
            price: 0,
            minSlot: 0,
            maxSlot: 0,
            location: '',
            owner: '',
            medias: [],
        }
    });


    return (
        <SafeAreaView className={"px-3"}>
                <View className={"rounded-2xl bg-white row-col"}>
                    <View className={"flex-row items-center m-2 px-5 py-2 border-amber-400 border-2 rounded-2xl"}>
                        <Ionicons name={"alert-circle-outline"} size={56} color={"yellow"}/>
                        <View className={"flex-col ml-4"}>
                            <Text className={"text-lg mb-2 text-gray-500"}>
                                Đã thanh toán
                            </Text>
                            <Text className={"font-pbold text-3xl"}>
                                -200.000đ
                            </Text>
                        </View>
                    </View>
                    <View className={"row-col p-4"}>
                        <View className={"flex-row justify-between mb-2"}>
                            <Text className={"text-lg text-gray-500"}>
                                Trạng thái
                            </Text>
                            <View className={"flex-row self-start px-2 py-0.5 bg-yellow-200 rounded-3xl "}>
                                <Text className={"text-yellow-700 font-bold"}>Đang chờ</Text>
                            </View>
                        </View>
                        <View className={"flex-row justify-between mb-2"}>
                            <Text className={"text-lg text-gray-500"}>
                                Thời gian
                            </Text>
                            <Text className={"text-lg"}>
                                13:31 27/06/2024
                            </Text>
                        </View>
                        <View className={"flex-row justify-between mb-2"}>
                            <Text className={"text-lg text-gray-500"}>
                                Mã giao dịch
                            </Text>
                            <View className={"w-[55%]"}>
                                <Text className={"text-lg"}>
                                    {id}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className={"rounded-2xl my-2 p-4 bg-white row-col "}>
                    <View className={"flex-row justify-between mb-2"}>
                        <Text className={"text-lg text-gray-500"}>
                            Dịch vụ
                        </Text>
                        <Text className={"text-lg"}>
                            Đặt cọc sân
                        </Text>
                    </View>
                    <View className={"flex-row justify-between mb-2"}>
                        <Text className={"text-lg text-gray-500"}>
                            Tên cửa hàng
                        </Text>
                        <Text className={"text-lg"}>
                            Pickleball Cort Q.8
                        </Text>
                    </View>
                    <View className={"flex-row justify-between mb-2"}>
                        <Text className={"text-lg text-gray-500"}>
                            Mô tả
                        </Text>
                        <View className={"w-[55%]"}>
                            <Text className={"text-lg"}>
                                Thanh toan dat coc ONLINE-FRI-06-27-2024-AWCGSW
                            </Text>
                        </View>
                    </View>
                </View>
                {/*Buttons*/}
                <View className={"mt-5"}>
                    <View className={"flex-row justify-between px-2"}>
                        <View className={"rounded-2xl px-5 py-1.5 w-[46%] items-center border-2 border-amber-300 bg-white"}>
                            <Text className={"text-xl text-amber-300"}>
                                Quay lại
                            </Text>
                        </View>
                        <View className={"rounded-2xl px-3 py-1.5 w-[46%] items-center bg-green-500"}>
                            <Text className={"text-xl text-white"}>
                                Giao dịch mới
                            </Text>
                        </View>
                    </View>
                </View>
        </SafeAreaView>
    );
};

    export default BookingDetail;