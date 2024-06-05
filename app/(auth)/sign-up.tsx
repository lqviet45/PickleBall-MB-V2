import React, {useState} from 'react';
import {Link, router} from "expo-router";
import {View, Text, ScrollView, Image, Alert} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import images from "@/constants/images";
import {useGlobalContext} from "@/context/GlobalProvider";
import auth from "@react-native-firebase/auth";

const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        if (form.username === "" || form.email === "" || form.password === "") {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        setIsSubmitting(true);
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(form.email, form.password);

            await userCredential.user.updateProfile({
               displayName: form.username
            });

            //Alert.alert('Success', 'Signed up successfully');

            router.replace('/home');
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        className="w-[115px] h-[35px]"
                    />
                    <Text className="text-2xl text-white
          text-semibold mt-10 font-psemibold">
                        Sign up to Aura
                    </Text>

                    <FormField
                        title='Username'
                        value={form.username}
                        handleChangeText={(e) => setForm({ ...form, username: e })}
                        otherStyles='mt-10'
                    />

                    <FormField
                        title='Email'
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles='mt-7'
                        keyBoardType='email-address'
                    />

                    <FormField
                        title='Password'
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles='mt-7'
                        keyBoardType='password'
                    />

                    <CustomButton
                        title='Sign up'
                        handlePress={submit}
                        containerStyles='mt-7'
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            have an account already?
                        </Text>

                        <Link href='/sign-in' className='text-lg font-psemibold text-secondary'>
                            Sign in
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;