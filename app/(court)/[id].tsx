import {SafeAreaView} from "react-native-safe-area-context";
import {router, useLocalSearchParams} from "expo-router";
import {ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {CourtGroup} from "@/model/courtGroup";
import {axiosInstance, axiosInstanceAuth} from "@/lib/axios";
import {useGlobalContext} from "@/context/GlobalProvider";
import {getUserToken} from "@/lib/authServices";
import {AddDotToNumber} from "@/lib/helper";


const CourtDetail = () => {
    let {id} = useLocalSearchParams<{ id: string }>();

    const {userId, userLogin} = useGlobalContext();
    // because using img tag, we need to use set the state to true
    // then there will be no error when the image is loaded
    const [isLoading, setIsLoading] = useState(true);
    const [court, setCourt] = useState<CourtGroup>({
        id: '',
        userId: '',
        wardId: '',
        name: '',
        price: 0,
        minSlot: 0,
        maxSlot: 0,
        location: '',
        owner: '',
        medias: [{
            id: '',
            mediaUrl: '',
            createOnUtc: '',
            modifiedOnUtc: ''
        }]
    });

    const [bookMark, setBookMark] = useState({
        isBookedMarked: false,
        id: ''
    });

    const [isBlocked, setIsBlocked] = useState(false);
    const [time, setTime] = useState(10);
    const timer = useRef(time);
    const clickCountRef = useRef(0);

    const fetchCourt = async () => {
        setIsLoading(true);
        const data = await axiosInstance.get(`court-groups/${id}`);
        await fetchBookMark();
        setCourt(data.data.value);
        setIsLoading(false);
    }

    const fetchBookMark = async () => {
        try {
            const data = await axiosInstance.get('/bookmarks', {
               params: {
                    userId: userId,
                    courtGroupId: id
               }
            });
            setBookMark({
                isBookedMarked: !data.data.value.isDeleted,
                id: data.data.value.id
            });

        } catch (e) {
            setBookMark((prev) =>
                ({...prev, isBookedMarked: false})
            );
        }
    }

    const createBookMark = async () => {
        try {
            const token = await getUserToken();
            const axiosInstance = axiosInstanceAuth(token);
            const data = await axiosInstance.post(`/bookmarks`,{
                courtGroupId: court.id,
                userId: userId
            });
            setBookMark({
                isBookedMarked: !data.data.value.isDeleted,
                id: data.data.value.id
            });
        } catch (e) {
            setBookMark((prev) =>
                ({...prev, isBookedMarked: false})
            );
            Alert.alert("Error", "Failed to create bookmark");
            return;
        }
    }

    const deleteBookMark = async () => {
        try {
            const token = await getUserToken();
            if (!token) {
                Alert.alert("Error", "Session expired. Please login again.");
                router.push({
                    pathname: '(auth)/sign-in'
                });
                return;
            }
            const axiosInstance = axiosInstanceAuth(token);
            await axiosInstance.delete(`/bookmarks/${bookMark.id}`,{
                params: {
                    Id: bookMark.id
                }
            });
            setBookMark((prev) =>
                ({...prev, isBookedMarked: false})
            );
        } catch (e) {
            console.log(e);
            Alert.alert("Error", "Failed to delete bookmark");
            return;
        }
    }

    const onPressBookMark = async () => {
        if (isBlocked) {
            Alert.alert("Error", `You have clicked too many times. Please wait ${time} seconds`);
            return;
        }

        // increase click count
        clickCountRef.current += 1;

        if (clickCountRef.current > 2) {
            setIsBlocked(true);
            setTime(10);
            // start timer to unblock
            const countDown = setInterval(() => {
                timer.current -= 1;
               if (timer.current <= 0) {
                   clearInterval(countDown);
                   setIsBlocked(false);
                   clickCountRef.current = 0;
                   timer.current = 10;
               } else {
                   setTime(timer.current);
               }
            }, 1000);
        } else {
            setTimeout(() => {
                clickCountRef.current = 0;
            }, 2000)
        }

        if (bookMark.isBookedMarked) {
            await deleteBookMark();
        } else {
            await createBookMark();
        }
    }

    useEffect(() => {
        fetchCourt()
            .catch(e => console.log(e));
    }, []);

    const bookCourt = () => {
        // book court
        console.log(court.id);
        router.push({
            pathname: `(court)/${id}/order`,
            params: {
                id: court.id,
                name: court.name,
                price: court.price
            }
        });
    }

    // if loading, show loading screen and it will be render first
    if (isLoading) {
        return (
            <SafeAreaView className="h-full w-full">
                <View className="items-center h-full justify-center">
                    <ActivityIndicator size="large" color="black"/>
                    <Text className="text-center text-base font-pmedium text-lg">
                        Loading...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="bg-Base h-full w-full">
            <ScrollView className="w-full">
                <View className="w-full flex-col">
                    {/*Picture*/}
                    <View className="w-full items-center mt-6 relative">
                        <Image
                            source={{uri: (court.medias !== undefined && court.medias[0] !== undefined) ? court.medias[0].mediaUrl : "https://www.thespruce.com/thmb/1J6"}}
                            className="w-[380] h-[340] items-center rounded-2xl"
                            resizeMode={'cover'}
                        />
                        <View className="absolute top-5 left-5">
                            <TouchableOpacity
                                onPress={() => router.back()}
                            >
                                <Ionicons
                                    name={'chevron-back'}
                                    size={40}
                                    color={'black'}
                                />
                            </TouchableOpacity>
                        </View>
                        {/*Bookmark*/}

                        <View className="absolute bottom-5 right-14">
                            <TouchableOpacity
                                onPress={onPressBookMark}
                            >
                                <View className="bg-white w-14 h-14 items-center justify-center rounded-full">
                                    {
                                        bookMark.isBookedMarked
                                            ? <Ionicons
                                                name={'heart'}
                                                size={40}
                                                color={'red'}
                                            />
                                            : <Ionicons
                                                name={'heart-outline'}
                                                size={40}
                                                color={'red'}
                                            />
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*Info*/}
                    <View className="w-full flex-col px-6 mt-5">
                        <Text className="text-4xl font-psemibold text-black mb-1">
                            {court.name}
                        </Text>
                        {/*Location info*/}
                        <View className="flex-row justify-start items-center w-full mb-2">
                            <Ionicons
                                name={'location-outline'}
                                size={24}
                                color={'gray'}
                            />
                            <Text className="text-xl ml-1 font-light text-gray-500">
                                {court.location}
                            </Text>
                        </View>
                        {/*Court's owner*/}
                        <View className="flex-row justify-start items-center w-full mb-2">
                            <Ionicons
                                name={'person'}
                                size={24}
                                color={'black'}
                            />
                            <Text className="text-xl ml-1 font-plight text-black">
                                {court.owner ?? 'Owner'}
                            </Text>
                        </View>
                        {/*Open time*/}
                        <Text className="text-lg font-plight text-black">
                            Giờ mở cửa: 6:00 AM - 10:00 PM
                        </Text>

                        <View className="flex-row mt-4 items-center">
                            <Ionicons
                                name={'star'}
                                size={26}
                                color={'yellow'}
                            />
                            <Text className="text-xl text-secondary-200 pl-3">
                                4.5 (200 Đánh giá)
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/*Price and order button*/}
            <View className="flex-row justify-between mx-6 items-center mb-4">
                <View className={"flex-col"}>
                    <Text className="text-black font-bold text-lg">
                        Giá
                    </Text>
                    <Text className="text-black font-plight  text-2xl">
                        {AddDotToNumber(court.price)} Đ
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={bookCourt}
                    className="w-44 bg-secondary rounded-xl px-6 items-center justify-center py-3"
                >
                    <Text className="text-black font-bold text-2xl">
                        Đặt ngay
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CourtDetail;