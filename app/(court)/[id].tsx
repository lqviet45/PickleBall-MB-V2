import {SafeAreaView} from "react-native-safe-area-context";
import {router, useLocalSearchParams} from "expo-router";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {CourtGroup} from "@/model/courtGroup";
import {axiosInstance} from "@/lib/axios";


const CourtDetail = () => {
    let {id} = useLocalSearchParams<{ id: string }>();
    //const  id = 'cd5c17ee-e58f-4001-240a-08dc9519f4f7';
    const [court, setCourt] = useState<CourtGroup>({
        id: '',
        name: '',
        price: 0,
        minSlot: 0,
        maxSlot: 0,
        location: '',
        owner: '',
        medias: [],
    });

    const [isBookedMarked, setIsBookedMarked] = useState(false);

    useEffect(() => {

        // fetch court
        axiosInstance.get(`court-groups/${id}`)
            .then(res => {
                setCourt({
                    id: res.data.value.id,
                    name: res.data.value.name,
                    price: res.data.value.price,
                    minSlot: res.data.value.minSlot,
                    maxSlot: res.data.value.maxSlot,
                    location: res.data.value.location,
                    owner: res.data.value.user.fullName,
                    medias: res.data.value.medias
                });
            })
            .catch(e => console.log(e));

    }, []);
    console.log("(court/[id])",court);
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

    return (
        <SafeAreaView className="bg-Base h-full w-full">
            <ScrollView className="w-full">
                <View className="w-full flex flex-col">
                    <View className="w-full items-center mt-10 relative">
                        <Image
                            source={{uri: 'https://via.placeholder.com/200'}}
                            // style={{width: 150, height: 150}}
                            className="w-[350] h-[400] items-center rounded-lg"
                            resizeMode={'cover'}
                        />
                        <View className="absolute bottom-12 right-16">
                            <TouchableOpacity
                                onPress={() => setIsBookedMarked(!isBookedMarked)}
                            >
                                <View className="bg-white w-10 h-10 items-center justify-center rounded-3xl">
                                    {
                                        isBookedMarked
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

                        {/*<View className="w-[95%]">*/}
                        {/*    <Text className="text-lg font-bold text-white mt-2">*/}
                        {/*        Description*/}
                        {/*    </Text>*/}
                        {/*    <Text className="text-white break-all text-justify tracking-wide">*/}
                        {/*        /!*{court.description}*!/*/}
                        {/*    </Text>*/}
                        {/*</View>*/}

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