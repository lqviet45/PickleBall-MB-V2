import {SafeAreaView} from "react-native-safe-area-context";

import {useEffect, useState} from "react";
import {FlatList, View, Text, RefreshControl} from "react-native";
import {BookingOrder} from "@/model/bookingOrder";
import {useGlobalContext} from "@/context/GlobalProvider";
import Ionicons from "@expo/vector-icons/Ionicons";

const Order = () => {

    const [bookingOrder, setBookingOrder] = useState<BookingOrder[]>([]);
    const {userFullName} = useGlobalContext();

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    useEffect(() => {
        //getBookingOrder();
        for (let i = 0; i < 100; i++) {
            setBookingOrder((prev) => [
                ...prev,
                {
                    id: i.toString(),
                    courtYardId: i.toString(),
                    courtGroupId: i.toString(),
                    userId: i.toString(),
                    dateId: i.toString(),
                    numberOfPlayers: i,
                    bookingStatus: i.toString(),
                    createOnUtc: i.toString(),
                    date: new Date(),
                    courtGroup: {
                        id: i.toString(),
                        name: `Court ${i}`,
                        description: `Court ${i}`,
                        courtYardId: i.toString(),
                        courtYard: {
                            id: i.toString(),
                            name: `Yard ${i}`,
                            description: `Yard ${i}`,
                            address: `Address ${i}`,
                            phoneNumber: '123456789',
                            createOnUtc: i.toString(),
                            updateOnUtc: i.toString(),
                        },
                        createOnUtc: i.toString(),
                        updateOnUtc: i.toString(),
                    }
                }
            ])
        }
    }, []);

    return (
        <SafeAreaView>
            <FlatList
                data={bookingOrder}
                keyExtractor={(item) => item.id}
                initialNumToRender={10}
                renderItem={(
                    ({item}) => (
                        <View className="my-2">
                            {/*<OrderItem item={item}/>*/}
                            <View className="flex flex-row
                            bg-blue-400 rounded-lg w-[95%] mx-auto
                            items-center justify-between
                            px-4 py-2">
                                <View>
                                    <Text className="font-pmedium text-lg text-black">
                                        {item.courtGroup.name}
                                    </Text>
                                    <Text className="text-amber-300">
                                        {item.date.toLocaleDateString('vi-VN', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        })}
                                    </Text>
                                </View>
                                <View className="flex flex-row items-center">
                                    <Ionicons
                                        name="checkmark-done-circle"
                                        size={24}
                                        color="green"
                                    />
                                    <Text className="text-green-500 font-pmedium text-lg">
                                        {item.bookingStatus}
                                    </Text>
                                </View>
                            </View>
                        </View>
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