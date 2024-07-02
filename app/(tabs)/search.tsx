import React, {useEffect, useState, useLayoutEffect} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ActivityIndicator, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {CourtGroup} from "@/model/courtGroup";
import FormField from "@/components/FormField";
import values from "ajv/lib/vocabularies/jtd/values";
import CourtCardHorizonal from "@/components/CourtCardHorizontal";
import icons from "@/constants/icons";
import axios from "axios";
import {axiosInstance} from "@/lib/axios";
import {router} from "expo-router";

const Search = () => {
    let [search, setSearch] = useState<string>("");
    let [searchResult, setSearchResult] = useState<CourtGroup[]>([]);
    let [isLoading, setIsLoading] = useState<boolean>(false);

    useLayoutEffect(() => {
        setIsLoading(true);
        const fetchAllCourt = async () => {
            const params = {
                Name: search == "" ? undefined : search,
                PageSize: 10
            }
            const data =
                //search === "" ? await axiosInstance.get('/court-groups/') :
                await axiosInstance.get('/court-groups/search', {params});
            setSearchResult(data.data.value);
            console.log("fetched search", searchResult.map(e => e.medias));

        }
        fetchAllCourt()
           .catch(e => console.log(e));
        setIsLoading(false);


    }, [search]);

    const handleSearch = (text: string) => {
        setSearch(text);
    }

    if (isLoading) {
        return (
            <SafeAreaView>
                <ActivityIndicator size="large" color="black"/>
                <Text className="text-center text-black font-pmedium text-lg">
                    Loading...
                </Text>
            </SafeAreaView>
        );
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
                            onChangeText={e => handleSearch(e)}
                        />
                    </View>
                </View>
                {/*Search result*/}
                {/*item.medias != undefined ? item.medias[0].mediaUrl : */}
                <View className={"flex-1"}>
                    <Text className="text-xl font-pbold px-2 pt-3">Kết quả tìm kiếm</Text>
                    <FlatList
                        data={searchResult}
                        keyExtractor={(item) => item.id}
                        initialNumToRender={10}
                        renderItem={(
                            ({item}) => (
                                <CourtCardHorizonal
                                    courtId={item.id}
                                    courtImage={
                                        (item.medias !== undefined && item.medias[0] !== undefined) ? item.medias[0].mediaUrl : "https://www.thespruce.com/thmb/1J6"
                                    }
                                    rating={4.5}
                                    courtName={item.name}
                                    location={item.location}
                                />
                            )
                        )}
                    />
                </View>
        </SafeAreaView>
    );
};

export default Search;