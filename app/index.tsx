import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, View, Image, Text, Platform} from "react-native";
import images from "../constants/images";
import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {useGlobalContext} from "@/context/GlobalProvider";
import {useEffect, useRef, useState} from "react";
import * as Notifications from "expo-notifications";
import {registerForPushNotificationsAsync} from "@/lib/notification";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false
    })
});

const App = () => {

    const {isLoggedIn, isLoading, setExpoPushToken} = useGlobalContext();
    //if (!isLoading && isLoggedIn) return <Redirect href={'/home'}/>;
    useEffect(() => {
        registerForPushNotificationsAsync()
            .then(token => setExpoPushToken(token ?? ''))
            .catch((error: any) => setExpoPushToken(`${error}`));

        setTimeout(() => {
            if (!isLoading && isLoggedIn) {
                router.replace('/home');
            } else if (!isLoading && !isLoggedIn) {
                router.replace('/sign-in');
            }
        }, 3000);

    }, [isLoading]);

    return (
        <SafeAreaView className={`bg-Base h-full`}>
            <ScrollView contentContainerStyle={{height: '100%'}}>
                <View className="w-full items-center justify-center min-h-[85vh] px-4">
                    <Image
                        source={images.logoPickle}
                        className="w-[130px] h-[84px]"
                        resizeMode="contain"
                    />

                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">
                            <Text className="text-yellow-100">
                                PICKLECOURT
                            </Text>
                        </Text>

                        <Image
                            source={images.path}
                            className="w-[136px] h-[15px]
                            absolute -bottom-2 -right-8"
                            resizeMode={'contain'}
                        />
                    </View>

                </View>
            </ScrollView>
            <StatusBar backgroundColor={'#08222F'} style="light"/>
        </SafeAreaView>
    );
};

export default App;