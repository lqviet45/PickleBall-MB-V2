import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalSearchParams} from "expo-router";
import {ScrollView, Text} from "react-native";

import React from 'react';

const CourtDetail = () => {
    let {id} = useLocalSearchParams<{id: string}>();
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>Court Detail {id}</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CourtDetail;