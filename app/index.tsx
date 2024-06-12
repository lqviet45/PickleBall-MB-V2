import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, View, Image, Text} from "react-native";
import images from "../constants/images";
import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {useGlobalContext} from "@/context/GlobalProvider";
import {useEffect} from "react";

const App = () => {

    const {isLoggedIn, isLoading} = useGlobalContext();

    //if (!isLoading && isLoggedIn) return <Redirect href={'/home'}/>;
    useEffect(() => {
         setTimeout(() => {
            if (!isLoading && isLoggedIn) {
                router.replace('/home');
            } else if (!isLoading && !isLoggedIn) {
                router.replace('/sign-in');
            }
        }, 3000);
        // if (!isLoading && isLoggedIn) {
        //     router.replace('/home');
        // } else if (!isLoading && !isLoggedIn) {
        //     router.replace('/sign-in');
        // }
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

                    {/*<Image*/}
                    {/*    source={images.card}*/}
                    {/*    className="max-w-[380px] w-full h-[300px]"*/}
                    {/*    resizeMode="contain"*/}
                    {/*/>*/}

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

                    {/*<Text className="text-sm font-pregular text-gray-100 mt-7 text-center">*/}
                    {/*    Where creativity meets innovation:*/}
                    {/*    embark on a journey of limitless exploration with Aora.*/}
                    {/*</Text>*/}

                    {/*<CustomButton*/}
                    {/*    title='Continue with Email'*/}
                    {/*    handlePress={() => router.push('/sign-in')}*/}
                    {/*    containerStyles={'w-full mt-7'}*/}
                    {/*/>*/}
                </View>
            </ScrollView>
            <StatusBar backgroundColor={'#08222F'} style="light"/>
        </SafeAreaView>
    );
};

export default App;