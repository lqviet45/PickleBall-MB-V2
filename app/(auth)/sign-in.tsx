import React, {useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, Image, View, Text, Alert, TouchableOpacity} from "react-native";
import images from "@/constants/images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router";
//import {useGlobalContext} from "@/context/GlobalProvider";
import auth from "@react-native-firebase/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import {GoogleSignin} from "@react-native-google-signin/google-signin";

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    //const { setUser, setIsLoggedIn } = useGlobalContext();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        if (form.email === "" || form.password === "") {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        setIsSubmitting(true);
        try {
            const userCredential = await auth().signInWithEmailAndPassword(form.email, form.password);
            //await signIn(form.email, form.password);
            //const result = await getCurrentUser();

            //setUser(userCredential.user);
            //setIsLoggedIn(true);
            Alert.alert('Success', 'Logged in successfully');

            router.replace('/home');
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    const SignInWithGoogle = async () => {
        await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
        });
        const { idToken } = await GoogleSignin.signIn();

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        await auth().signInWithCredential(googleCredential);

        Alert.alert('Success', 'Logged in successfully');

        router.replace('/home');
    }

    return (
        <SafeAreaView className="bg-Base h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                    <View className="h-fit w-full items-center justify-center flex-row">
                        <Image
                            source={images.logoPickle}
                            resizeMode='contain'
                            className="w-[60px] h-[35px] self-center"
                        />
                            <Text className="text-yellow-100 text-3xl font-bold text-center">
                                PICKLECOURT
                            </Text>
                    </View>
                    <Text className="text-2xl text-white
          text-semibold mt-10 font-psemibold self-center">
                        Login to Our App
                    </Text>

                    <FormField
                        title='Email'
                        value={form.email}
                        handleChangeText={(e) => setForm({...form, email: e})}
                        otherStyles='mt-7'
                        keyBoardType='email-address'
                    />

                    <FormField
                        title='Password'
                        value={form.password}
                        handleChangeText={(e) => setForm({...form, password: e})}
                        otherStyles='mt-7'
                        keyBoardType='password'
                        isPassword={true}
                    />

                    <CustomButton
                        title='Sign In'
                        handlePress={submit}
                        containerStyles='mt-7'
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center gap-4">
                        <View className="justify-center pt-5 flex-row gap-2">
                            <Text className="text-lg text-gray-100 font-pregular">
                                Don't have an account?
                            </Text>

                            <Link href='/sign-up' className='text-lg font-psemibold text-secondary'>
                                Sign up
                            </Link>
                        </View>

                        <View className="justify-center pt-5 flex-row gap-2">
                            <Text className="text-lg text-gray-100 font-pregular">
                                Forgot your password?
                            </Text>

                            <Link href='/forgot-password' className='text-lg font-psemibold text-secondary'>
                                Reset
                            </Link>
                        </View>

                        <View className="pt-5 items-center">
                            <TouchableOpacity
                                className="justify-center items-center"
                                onPress={() => SignInWithGoogle()}
                            >
                                <Ionicons name={'logo-google'} size={30} color={'#fff'} />
                                <Text className="text-lg text-gray-100 font-pregular">
                                    Sign in with Google
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;