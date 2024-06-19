import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalSearchParams} from "expo-router";
import {Image, ScrollView, Text} from "react-native";
import {useState} from "react";


const CourtDetail = () => {
    let {id} = useLocalSearchParams<{id: string}>();
    const [court, setCourt] = useState()


    return (
        <SafeAreaView>
            <ScrollView>
                <Image
                    source={{uri: 'https://via.placeholder.com/150'}}
                    style={{width: 150, height: 150}}
                />
                <Text>Court Detail {id}</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CourtDetail;