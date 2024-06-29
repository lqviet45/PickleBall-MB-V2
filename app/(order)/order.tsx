import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {FlatList, View, Text, RefreshControl, TouchableOpacity, ActivityIndicator} from "react-native";
import {BookingOrder} from "@/model/bookingOrder";
import {useGlobalContext} from "@/context/GlobalProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import {axiosInstance} from "@/lib/axios";
import {router} from "expo-router";

const Order = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [bookingOrder, setBookingOrder] = useState<BookingOrder[]>([]);
    const {userFullName, userId} = useGlobalContext();

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);

        fetchBookingOrder()
            .catch(e => console.log(e));

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    const fetchBookingOrder = async () => {
        const data = await axiosInstance
            .get(`users/${userId}/bookings`);

        setBookingOrder(data.data.value);

    }

    useEffect(() => {
        setIsLoading(true);

        fetchBookingOrder()
            .catch(e => console.log(e));

        setIsLoading(false);
        console.log(bookingOrder);
    }, []);

    if (isLoading) {
        return (
            <SafeAreaView>
                <ActivityIndicator size="large" color="black"/>
                <Text className="text-center text-black font-pmedium text-lg">
                    Loading...
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <FlatList
                data={bookingOrder}
                //keyExtractor={(item) => item.id}
                initialNumToRender={10}
                renderItem={(
                    ({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                                console.log(item.id);
                                router.push({
                                    pathname: `(order)/[id]`,
                                    params: {id: item.id}
                                });
                            }}
                        >
                            <View className="my-2">
                                {/*<OrderItem item={item}/>*/}
                                <View className="flex flex-row
                                bg-blue-400 rounded-lg w-[95%] mx-auto
                                justify-between
                                px-4 py-2">
                                    <View className="w-28">
                                        <Text className="font-pmedium text-lg text-black">
                                            {item.courtGroup.name}
                                        </Text>
                                        <Text className="text-amber-300">
                                            {item.numberOfPlayers} players
                                        </Text>
                                    </View>
                                    <View className="flex-col items-end end">
                                        <Text className="text-black">
                                            {
                                                new Date(item.date.dateWorking)
                                                    .toLocaleDateString('vi-VN', {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit'
                                                    })
                                            }
                                        </Text>
                                        <Text className="text-black">
                                            {item.timeRange}
                                        </Text>
                                    </View>
                                    <View className="flex flex-row items-center">
                                        <Text className="text-black font-pmedium text-sm">
                                            {item.bookingStatus}
                                        </Text>
                                        {
                                            item.bookingStatus === 'Pending' ?
                                                <Ionicons
                                                    name="time-outline"
                                                    size={24}
                                                    color="red"
                                                /> :
                                                <Ionicons
                                                    name="checkmark-done-circle"
                                                    size={24}
                                                    color="green"
                                                />
                                        }
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                )}

                ListHeaderComponent={() => (
                    <View className="flex my-6 px-4 space-y-6">
                        <View className="flex justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-lg text-black">
                                    Take your booking
                                </Text>
                                <Text className="text-2xl font-psemibold text-amber-300">
                                    {userFullName}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}

                ListEmptyComponent={() => (
                    <View className="items-center justify-center mt-10">
                        <Ionicons
                            name="basket"
                            size={100}
                            color="black"
                        />
                        <Text className="text-center text-black font-pmedium text-lg">
                            You have no booking, please book some court
                        </Text>
                    </View>
                )}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
    );
};


export default Order;