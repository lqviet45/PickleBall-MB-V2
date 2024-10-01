import {SafeAreaView} from "react-native-safe-area-context";
import images from "@/constants/images";
import {ScrollView, View, Text, Image, ImageBackground} from "react-native";
import CustomButton from "@/components/CustomButton";
import {router} from "expo-router";

const LandingPage = () => {
    function onLogIn() {
        router.push('/sign-in');
    }

    function onSignUp() {
        router.push('/sign-up');
    }

    return (
        <ImageBackground source={images.landing} resizeMode={"stretch"}  className={"flex-1 h-full justify-center"}>
            <SafeAreaView className={"h-full"}>
                <View className={"flex-col h-full justify-between"}>
                    <View className={"justify-center flex-col mt-24"}>
                        <Text className={"text-5xl italic font-bold text-center text-text"}>PICKLEBALL COURT</Text>
                        <Text className={"text-xl font-medium text-center text-text"}>Đặt sân dễ dàng, kết nối bạn bè</Text>
                    </View>
                    <View className={"px-4 py-9"}>
                        <CustomButton title={"Đăng ký"}
                                      handlePress={onSignUp}
                                      containerStyles={"bg-white mb-2"}
                                      textStyles={"font-medium text-text text-lg"}/>
                        <CustomButton title={"Đăng nhập"}
                                      handlePress={onLogIn}
                                      containerStyles={"bg-text"}
                                      textStyles={"font-medium text-green-600 text-lg"}/>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>

    );
};

export default LandingPage;