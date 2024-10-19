import React, {useEffect, useState} from 'react';
import {router, useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text, TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {axiosInstance, axiosInstanceAuth} from "@/lib/axios";
import {switchCase} from "@babel/types";
import {useGlobalContext} from "@/context/GlobalProvider";
import {getUserToken} from "@/lib/authServices";
import * as Linking from "expo-linking";
import {AddDotToNumber} from "@/lib/helper";

const BookingDetail = () => {
    const {id} = useLocalSearchParams<{id: string}>();
    const {userId} = useGlobalContext();
    const [booking, setBooking] = useState<any>();
    const [isLoaded, setIsLoaded] = useState(false);

    const formatDateTime = (date: string) => {
        const newDate = new Date(date);
        return newDate.toLocaleString();
    }
    const formatDateOnly = (date: string, timeRange: string) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString() + " " + timeRange;
    }

    const handlePaying = async () => {
        const token = await getUserToken();
        console.log("userId ", userId)
        console.log("bookingId ", id)
        console.log("name ", booking.courtYard.name)
        console.log("description ", booking.timeRange)
        console.log("amount ", booking.amount)
        //Get payingUrl
        const confirmData = {
            userId: userId,
            bookingId: id,
            name: booking.courtYard.name,
            description: booking.timeRange,
            price: booking.amount,
            returnUrl: "pickle-ball:///(payment)/ResultScreen?isBooking=yes&customerId=" + userId,
            cancelUrl: `pickle-ball:///(payment)/ResultScreen?isBooking=yes&customerId=` + userId
        }
        //router.push("/ConfirmOrder");
        router.push({
            pathname: "(payment)/ConfirmOrder",
            params: confirmData
        });
        //console.log("(order)/[id].handlePaying: ", data.data);
    }

    const fetchBookingDetail = async () => {
        const data = await axiosInstance
            .get(`/bookings/${id}/detail`)
            .then(res => {
                setBooking(res.data.value);
            })
            .catch(err => {
                console.log("fetchBookingDetail catching: ", err);
            });
    }

    const renderBookingStatus = () => {
        switch(booking.bookingStatus){
            case "Pending":
                return(
                    <View className={"flex-row self-start px-2 py-0.5 bg-yellow-200 rounded-3xl "}>
                        <Text className={"text-yellow-700 font-bold"}>{booking?.bookingStatus}</Text>
                    </View>
                )
            case "Cancelled":
                return (
                    <View className={"flex-row self-start px-2 py-0.5 bg-red-200 rounded-3xl "}>
                        <Text className={"text-red-700 font-bold"}>{booking?.bookingStatus}</Text>
                    </View>
                )
            case "Confirmed":
                return (
                    <View className={"flex-row self-start px-2 py-0.5 bg-blue-200 rounded-3xl "}>
                        <Text className={"text-blue-700 font-bold"}>{booking?.bookingStatus}</Text>
                    </View>
                )
            case "Completed":
                return (
                    <View className={"flex-row self-start px-2 py-0.5 bg-green-200 rounded-3xl "}>
                        <Text className={"text-green-700 font-bold"}>{booking?.bookingStatus}</Text>
                    </View>
                )

        }
    }
    const renderInfoCard = () => {
        switch(booking.bookingStatus){
            case "Pending":
                return(
                    <View className={"flex-row items-center m-2 px-5 py-2 border-amber-400 border-2 rounded-2xl"}>
                        <Ionicons name={"alert-circle-outline"} size={56} color={"yellow"}/>
                        <View className={"flex-col ml-4"}>
                            <Text className={"text-lg text-gray-500"}>
                                Tên sân
                            </Text>
                            <Text className={"font-bold text-amber-300 text-3xl"}>
                                {booking?.courtGroup.name}
                            </Text>
                        </View>
                    </View>
                )
            case "Cancelled":
                return (
                    <View className={"flex-row items-center m-2 px-5 py-2 border-red-400 border-2 rounded-2xl"}>
                        <Ionicons name={"ban-outline"} size={56} color={"red"}/>
                        <View className={"flex-col ml-4"}>
                            <Text className={"text-lg text-gray-500"}>
                                Tên sân
                            </Text>
                            <Text className={"font-bold text-red-300 text-3xl"}>
                                {booking?.courtGroup.name}
                            </Text>
                        </View>
                    </View>
                )
            case "Confirmed":
                return (
                    <View className={"flex-row items-center m-2 px-5 py-2 border-blue-400 border-2 rounded-2xl"}>
                        <Ionicons name={"checkmark-circle-outline"} size={56} color={"blue"}/>
                        <View className={"flex-col ml-4"}>
                            <Text className={"text-lg text-gray-500"}>
                                Tên sân
                            </Text>
                            <Text className={"font-bold text-blue-300 text-3xl"}>
                                {booking?.courtGroup.name}
                            </Text>
                        </View>
                    </View>
                )
            case "Completed":
                return (
                    <View className={"flex-row items-center m-2 px-5 py-2 border-green-400 border-2 rounded-2xl"}>
                        <Ionicons name={"checkmark-circle-outline"} size={56} color={"green"}/>
                        <View className={"flex-col ml-4"}>
                            <Text className={"text-lg text-gray-500"}>
                                Tên sân
                            </Text>
                            <Text className={"font-bold text-green-300 text-3xl"}>
                                {booking?.courtGroup.name}
                            </Text>
                        </View>
                    </View>
                )

        }
    }

    useEffect(() => {
        setIsLoaded(false);
        fetchBookingDetail().then(() => {
            setIsLoaded(true);
        });
    },[]);

    if(!isLoaded){
        return (
            <SafeAreaView className={"flex-col items-center justify-center"}>
                <View className={"flex-row items-center"}>
                    <Ionicons name={"refresh"} size={24} color={"gray"}/>
                    <Text className={"text-lg text-gray-500 ml-2"}>
                        Loading...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView className={"px-3"}>
                <View className={"rounded-2xl bg-white row-col"}>
                    {renderInfoCard()}

                    <View className={"row-col p-4"}>
                        <View className={"flex-row justify-between mb-2"}>
                            <Text className={"text-lg text-gray-500"}>
                                Trạng thái
                            </Text>
                            {renderBookingStatus()}
                        </View>
                        <View className={"flex-row justify-between mb-2"}>
                            <Text className={"text-lg text-gray-500"}>
                                Thời gian đặt
                            </Text>
                            <Text className={"text-lg"}>
                                {formatDateTime(booking?.date.createdOnUtc.toString())}
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
                            Thời hạn sử dụng
                        </Text>
                        <Text className={"text-lg"}>
                            {formatDateOnly(booking?.date.dateWorking.toString(), booking?.timeRange.toString())}
                        </Text>
                    </View>
                    <View className={"flex-row justify-between mb-2"}>
                        <Text className={"text-lg text-gray-500"}>
                            Địa chỉ
                        </Text>
                        <Text className={"text-lg"}>
                            {booking?.courtGroup.location}
                        </Text>
                    </View>
                    <View className={"flex-row justify-between mb-2"}>
                        <Text className={"text-lg text-gray-500"}>
                            Số lượng người chơi
                        </Text>
                        <Text className={"text-lg font-bold"}>
                            {booking?.numberOfPlayers}
                        </Text>
                    </View>
                    <View className={"flex-row justify-between mb-2"}>
                        <Text className={"text-lg text-gray-500"}>
                            Giá
                        </Text>
                        <Text className={"text-lg font-bold"}>
                            {AddDotToNumber(booking?.amount)} VND
                        </Text>
                    </View>
                </View>
                {/*Buttons*/}
                <View className={"mt-5"}>
                    <View className={"flex-row justify-between px-2"}>
                        <TouchableOpacity
                            className={"rounded-2xl px-5 py-1.5 w-[46%] items-center border-2 border-amber-300 bg-white"}
                        onPress={() => {
                            router.back()
                        }}>
                            <View >
                                <Text className={"text-xl text-amber-300"}>
                                    Quay lại
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {booking.bookingStatus === "Confirmed" ? (
                                <TouchableOpacity
                                    className={"rounded-2xl px-3 py-1.5 w-[46%] items-center bg-blue-500"}
                                    onPress={handlePaying}>
                                    <View >
                                        <Text className={"text-xl text-white"}>
                                            Thanh toán
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                        ) :
                        (
                            <TouchableOpacity
                                className={"rounded-2xl px-3 py-1.5 w-[46%] items-center bg-green-500"}
                                onPress={() => {
                                    router.push({
                                        pathname: `/(court)/${booking.courtGroup.id}`,
                                    })
                                }}>
                                <View >
                                    <Text className={"text-xl text-white"}>
                                        Giao dịch mới
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
        </SafeAreaView>
    );
};

    export default BookingDetail;