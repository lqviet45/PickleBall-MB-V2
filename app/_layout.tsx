import {useFonts} from "expo-font";
import {useEffect, useRef, useState} from "react";
import {router, SplashScreen, Stack} from "expo-router";
import GlobalProvider, {useGlobalContext} from "@/context/GlobalProvider";
import * as Notifications from "expo-notifications";
import {registerForPushNotificationsAsync} from "@/lib/notification";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    });

    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
        undefined
    );

    function redirect(notification: Notifications.Notification) {
        const url = notification.request.content.data?.url;
        if (url) {
            router.push(url);
        }
    }

    useEffect(() => {

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response.notification);
            redirect(response.notification);
        });

        if (error) throw error;
        if (fontsLoaded) SplashScreen.hideAsync();

        return () => {
            notificationListener.current &&
            Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) return null;
    return (
        <GlobalProvider>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}} />
                <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                <Stack.Screen name="(tabs)"  options={{headerShown: false}}/>
                <Stack.Screen name="(users)" options={{headerShown: false}}/>
                <Stack.Screen name="(court)" options={{headerShown: false}}/>
            </Stack>
        </GlobalProvider>
    );
};

export default RootLayout;