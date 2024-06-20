import React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {router} from "expo-router";

const Home = () => {
    return (
        <View className='w-full h-full justify-center justify-items-center items-center'>
            <Text>Home</Text>
            <TouchableOpacity
                onPress={() => {
                    router.push({
                       pathname: `(court)/[id]`,
                        params: {id: '123'}
                    });
                }
            }>
                <Text>Press me</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Home;