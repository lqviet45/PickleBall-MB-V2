import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useRef, useState} from "react";
import {FlatList, View, Text, RefreshControl, TouchableOpacity, ActivityIndicator, Alert} from "react-native";
import {BookingOrder} from "@/model/bookingOrder";
import {useGlobalContext} from "@/context/GlobalProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import {axiosInstance} from "@/lib/axios";
import {router} from "expo-router";
import CustomDropdown from "@/components/CustomDropdown";

const Order = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [bookingOrder, setBookingOrder] = useState<BookingOrder[]>([]);
    const {userFullName, userId} = useGlobalContext();
    const [isEnd, setIsEnd] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isInit, setIsInit] = useState(true);

    const searchBookingStatusRef = useRef<string>('');
    // The variable use to check is first time search with the same status
    const isFirstSearch = useRef<boolean>(false);
    const currentPage = useRef<number>(1);
    const pageSize: number = 10;
    const refresh = useRef<boolean>(false);

    // this is the data for the dropdown
    const bookingStatus = [
        {label: 'All', value: ''},
        {label: 'Pending', value: 'Pending'},
        {label: 'Confirmed', value: 'Confirmed'},
        {label: 'Cancelled', value: 'Cancelled'},
        {label: 'Completed', value: 'Completed'}
    ];
    // use this function to refresh the list
    const onRefresh = async () => {
        try {
            setIsEnd(false);
            refresh.current = true;
            setRefreshing(true);
            currentPage.current = 1;
            setTimeout(async () => {
                await fetchBookingOrder(currentPage.current);
                setRefreshing(false);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }

    // use this function to fetch more data when user scroll to the end of the list
    const onEndReached = () => {
        if (isEnd || !isLoaded) return;
        currentPage.current = currentPage.current + 1;
        fetchBookingOrder(currentPage.current)
            .catch(e => {
                // the one who make this response message
                // 'Bookings are not found' is a bad person
                // it should be 'No more booking'
                if (e.response.data.errors[0] === 'Bookings are not found') {
                    setIsEnd(true);
                }
            });
    }

    const onDropListChange = async (item: any) => {
        try {
            // if the selected value is not the same as the current value
            // then we will fetch the data again
            if (searchBookingStatusRef.current !== item.value) {
                currentPage.current = 1;
                isFirstSearch.current = true;
                setIsEnd(false);
                searchBookingStatusRef.current = item.value;
                await fetchBookingOrder(currentPage.current);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to search bookings');
        }
    }

    const fetchBookingOrder = async (pageNumber: number) => {
        const data = await axiosInstance
            .get(`users/${userId}/bookings`, {
                params: {
                    userId: userId,
                    pageSize: pageSize,
                    pageNumber: pageNumber,
                    bookingStatus: searchBookingStatusRef.current
                }
            });
        if (data.data.value.items.length === 0 && isFirstSearch.current) {
            setBookingOrder([]);
        }

        if (data.data.value.items.length === 0) {
            setIsEnd(true);
            return;
        }
        if (refresh.current || isInit || isFirstSearch.current) {
            setBookingOrder(data.data.value.items);
            refresh.current = false;
            isFirstSearch.current = false;
            setIsInit(false);
            return;
        }
        setBookingOrder([...bookingOrder, ...data.data.value.items]);
    }

    const renderBookingStatus = (status: string) => {
        switch (status) {
            case 'Pending':
                return (
                    <Ionicons
                        name="time-outline"
                        size={24}
                        color="yellow"
                    />
                );
            case 'Confirmed':
                return (
                    <Ionicons
                        name="checkmark-done-circle"
                        size={24}
                        color="green"
                    />
                );
            case 'Cancelled':
                return (
                    <Ionicons
                        name="close-circle"
                        size={24}
                        color="red"
                    />
                );
                case 'Completed':
                    return (
                        <Ionicons
                            name="checkmark-done-circle"
                            size={24}
                            color="green"
                        />
                    );
            default:
                return (
                    <Ionicons
                        name="time-outline"
                        size={24}
                        color="yellow"
                    />
                );
        }
    }

    useEffect(() => {
        if (isInit) {
            setIsLoaded(false);
            currentPage.current = 1;
            fetchBookingOrder(currentPage.current)
                .then(() => setIsLoaded(true))
                .catch(e => console.log("catching fetchBookingOrder", e.response));
        }

    }, []);

    if (!isLoaded) {
        return (
            <SafeAreaView className={"h-full items-center justify-center"}>
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
                keyExtractor={(item) => item.id}
                initialNumToRender={pageSize}
                renderItem={(
                    ({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                                console.log("item id: ",item.id);
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
                                            renderBookingStatus(item.bookingStatus)
                                        }
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                )}

                ListHeaderComponent={() => (
                    <View className="flex my-6 px-4 space-y-6">
                        <View className="flex justify-between items-start flex-row">
                            <View>
                                <Text className="font-pmedium text-lg text-black">
                                    Take your booking
                                </Text>
                                <Text className="text-2xl font-psemibold text-amber-300">
                                    {userFullName}
                                </Text>
                            </View>

                            <View className="flex justify-between items-start flex-row">
                                <CustomDropdown
                                    label={"booking status"}
                                    data={bookingStatus}
                                    labelField={'label'}
                                    valueField={'value'}
                                    value={searchBookingStatusRef.current === null ? 'All' : searchBookingStatusRef.current}
                                    onChange={onDropListChange}
                                    isSearchable={false}
                                />
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

                // this function will be called when user scroll to the end of the list
                onEndReached={onEndReached}
                // this value is used to determine how far from the end of the list to trigger onEndReached
                onEndReachedThreshold={0.1}

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