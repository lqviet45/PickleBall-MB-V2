import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalSearchParams} from "expo-router";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import Ionicons from "@expo/vector-icons/Ionicons";


const CourtDetail = () => {
    let {id} = useLocalSearchParams<{ id: string }>();
    const [court, setCourt] = useState()
    const [isBookedMarked, setIsBookedMarked] = useState(false)

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
                            Court Name
                        </Text>

                        <View className="flex-row justify-start items-center w-full mb-2">
                            <Ionicons
                                name={'location'}
                                size={20}
                                color={'white'}
                            />
                            <Text className="text-xs ml-1 font-bold text-white">
                                21 Đường Số 34, Phường 10, Quận 6, Thành phố Hồ Chí Minh
                            </Text>
                        </View>

                        <Text className="text-lg font-bold text-white">
                            6:00 AM - 10:00 PM
                        </Text>

                        <View className="w-[95%]">
                            <Text className="text-lg font-bold text-white mt-2">
                                Description
                            </Text>
                            <Text className="text-white break-all text-justify tracking-wide">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in nunc euismod, ultricies
                                sapien vitae, tincidunt turpis. Nullam nec nisl nec dui vehicula ultrices. Nullam nec nisl nec
                                dui vehicula ultrices.
                            </Text>
                        </View>

                        <View className="flex-row mt-10 items-center">
                            <Ionicons
                                name={'star'}
                                size={30}
                                color={'yellow'}
                            />
                            <Text className="text-xl text-yellow-100 pl-3">
                                4.5 (100 Reviews)
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View className="flex-row justify-around items-center mb-4">
                <View>
                    <Text className="text-white text-xl">
                        100.000 VND/hour
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        // router.push({
                        //     pathname: `(court)/[id]/book`,
                        //     params: {id}
                        // });
                    }}
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