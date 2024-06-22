import React, {useState} from 'react';
import {View, Text, ScrollView, Image, Alert} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "@/constants/images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import {Link} from "expo-router";
import auth from "@react-native-firebase/auth";

const ForgotPassword = () => {

    const [email, setEmail] = React.useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        if (email === "") {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        setIsSubmitting(true);
        await auth().sendPasswordResetEmail(email);
        setIsSubmitting(false);
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
                        Forgot Password
                    </Text>

                    <FormField
                        title='Email'
                        value={email}
                        handleChangeText={(e) => setEmail(e)}
                        otherStyles='mt-7'
                        keyBoardType='email-address'
                    />

                    <CustomButton
                        title='Send Email Reset Password'
                        handlePress={submit}
                        containerStyles='mt-7'
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Go back to sign in?
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

export default ForgotPassword;