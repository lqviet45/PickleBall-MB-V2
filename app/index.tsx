import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, View, Image, Text} from "react-native";
import images from "../constants/images";

const App = () => {

    return (
        <SafeAreaView className={`bg-primary h-full`}>
            <ScrollView contentContainerStyle={{height: '100%'}}>
                <View className="w-full items-center justify-center min-h-[85vh] px-4">
                    <Image
                        source={images.logo}
                        className="w-[130px] h-[84px]"
                        resizeMode="contain"
                    />

                    <Image
                        source={images.card}
                        className="max-w-[380px] w-full h-[300px]"
                        resizeMode="contain"
                    />

                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">
                            Discover Endless Possibilities with {' '}
                            <Text className="text-secondary-200">
                                Pickle Ball yarn
                            </Text>
                        </Text>

                        <Image
                            source={images.path}
                            className="w-[136px] h-[15px]
                            absolute -bottom-2 -right-8"
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
};

export default App;