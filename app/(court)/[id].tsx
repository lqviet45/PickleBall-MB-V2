import {SafeAreaView} from "react-native-safe-area-context";
import {router, useLocalSearchParams} from "expo-router";
import {ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {CourtGroup} from "@/model/courtGroup";
import {axiosInstance} from "@/lib/axios";
import {useGlobalContext} from "@/context/GlobalProvider";


const CourtDetail = () => {
    let {id} = useLocalSearchParams<{ id: string }>();

    const {userId} = useGlobalContext();
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
            console.log(data.data.value.isDeleted);
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
                    <Text className="text-center text-black font-pmedium text-lg">
                        Loading...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="bg-Base h-full w-full">
            <ScrollView className="w-full">
                <View className="w-full flex flex-col">
                    <View className="w-full items-center mt-10 relative">
                        <Image
                            source={{uri: (court.medias !== undefined && court.medias[0] !== undefined) ? court.medias[0].mediaUrl : "https://www.thespruce.com/thmb/1J6"}}
                            className="w-[350] h-[400] items-center rounded-lg"
                            resizeMode={'cover'}
                        />
                        <View className="absolute bottom-12 right-16">
                            <TouchableOpacity
                                onPress={onPressBookMark}
                            >
                                <View className="bg-white w-10 h-10 items-center justify-center rounded-3xl">
                                    {
                                        bookMark.isBookedMarked
                                            ? <Ionicons
                                                name={'heart'}
                                                size={30}
                                                color={'red'}
                                            />
                                            : <Ionicons
                                                name={'heart-outline'}
                                                size={30}
                                                color={'red'}
                                            />
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="w-full flex flex-col pl-6 mt-5">
                        <Text className="text-2xl font-bold text-white mb-2">
                            {court.name}
                        </Text>

                        <View className="flex-row justify-start items-center w-full mb-2">
                            <Ionicons
                                name={'location'}
                                size={20}
                                color={'white'}
                            />
                            <Text className="text-sm ml-1 font-bold text-white">
                                {court.location}
                            </Text>
                        </View>

                        <View className="flex-row justify-start items-center w-full mb-2">
                            <Ionicons
                                name={'person'}
                                size={20}
                                color={'white'}
                            />
                            <Text className="text-sm ml-1 font-bold text-white">
                                {court.owner}
                            </Text>
                        </View>

                        <Text className="text-lg font-bold text-white">
                            Open Time: 6:00 AM - 10:00 PM
                        </Text>

                        <View className="flex-row mt-10 items-center">
                            <Ionicons
                                name={'star'}
                                size={30}
                                color={'yellow'}
                            />
                            <Text className="text-xl text-yellow-100 pl-3">
                                4.5 (200 Reviews)
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View className="flex-row justify-around items-center mb-4">
                <View>
                    <Text className="text-white font-bold text-xl">
                        {court.price} h/VND
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={bookCourt}
                    className="bg-amber-400 rounded-xl px-6 items-center justify-center py-3"
                >
                    <Text className="text-black font-bold text-lg">
                        Book Now
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CourtDetail;