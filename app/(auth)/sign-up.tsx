import React, {useState} from 'react';
import {Link, router} from "expo-router";
import {View, Text, ScrollView, Image, Alert} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import images from "@/constants/images";
import {axiosInstance} from "@/lib/axios";
import auth from "@react-native-firebase/auth";
import {User} from "@/model/user";

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
            // should call backend api to create user
            // const userCredential = await auth().createUserWithEmailAndPassword(form.email, form.password);
            //
            // await userCredential.user.updateProfile({
            //    displayName: form.username
            // });
            //Alert.alert('Success', 'Signed up successfully');

            const data = {
                email: form.email,
                password: form.password,
                firstName: form.username,
                lastName: form.username,
                location: 'Vietnam',
                role: 4
            }
            console.log(data);
            const user = await axiosInstance.post<User>('/register',
                data);

            console.log(user);
            console.log(user.data);
            await auth().signInWithEmailAndPassword(form.email, form.password);
            router.replace('/home');
        } catch (error: any) {
            console.log(error);
            Alert.alert('Error', error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <SafeAreaView className="bg-Base h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                    <View className="h-fit w-full items-start justify-start flex-row">
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
          text-semibold mt-10 font-psemibold">
                        Sign up
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
                        isPassword={true}
                    />

                    <CustomButton
                        title='Sign up'
                        handlePress={submit}
                        containerStyles='mt-7'
                        textStyles={"text-primary font-psemibold text-lg"}
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