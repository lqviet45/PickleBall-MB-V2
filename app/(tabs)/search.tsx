import React, {useEffect, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {CourtGroup} from "@/model/courtGroup";
import FormField from "@/components/FormField";
import values from "ajv/lib/vocabularies/jtd/values";
import CourtCardHorizonal from "@/components/CourtCardHorizontal";
import icons from "@/constants/icons";

const Search = () => {
    let [search, setSearch] = useState<string>('');
    let [searchResult, setSearchResult] = useState<CourtGroup[]>([]);

    useEffect(() => {
        //searchCourt();

        for (let i = 0; i < 10; i++) {
            setSearchResult((prev) => [
                ...prev,
                {
                    id: i.toString(),
                    userId: i.toString(),
                    wardId: i.toString(),
                    wallerId: i.toString(),
                    name: `Court ${i}`,
                    price: i,
                    minSlot: i,
                    maxSlot: i,
                    wardName: `Ward ${i}`,
                    createdOnUtc: new Date(),
                    modifiedOnUtc: new Date()
                }
            ]);
        }
    }, []);

    const handleSearch = (text: string) => {
        setSearch(text);
    }
    return (
        <SafeAreaView className={"bg-white h-full"}>

                {/*Search bar*/}
                <View className="flex-row justify-between pt-3 px-2 m-1">
                    <Text className="text-2xl font-pbold font-bold">Tìm kiếm</Text>
                </View>
                <View className="px-2 mt-1 mb-4">
                    <View className="border-2 border-black-200
                            w-full h-14 px-4 bg-black-100
                            rounded-2xl focus:border-secondary items-center flex-row">
                        <TextInput
                            className="flex-1 text-white font-semibold
                                    text-base"
                            value={search}
                            editable={true}
                            placeholder={"Nhập tên sân"}
                            placeholderTextColor={'#7b7b8b'}
                            onChangeText={handleSearch}
                        />
                    </View>
                </View>
                {/*Search result*/}
                {/*<FlatList data={searchResult}*/}
                {/*          initialNumToRender={10}*/}
                {/*          renderItem={({item}) => (*/}
                {/*            )}*/}
                {/*/>*/}

                <CourtCardHorizonal
                    courtId={'item.id'}
                    courtImage={'https://via.placeholder.com/150'}
                    rating={4.5}
                    courtName={'Sân B'}
                    time={'08:00 - 16:00'}
                />


        </SafeAreaView>
    );
};

export default Search;