import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ActivityIndicator, FlatList, RefreshControl, Text, TextInput, View} from "react-native";
import {CourtGroup} from "@/model/courtGroup";
import CourtCardHorizonal from "@/components/CourtCardHorizontal";
import {axiosInstance} from "@/lib/axios";
const Search = () => {
    const [search, setSearch] = useState<string>("");
    const [searchResult, setSearchResult] = useState<CourtGroup[]>([]);
    const [isEnd, setIsEnd] = useState(false);
    const currentPage = useRef<number>(1);
    const pageSize: number = 10;
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInit, setIsInit] = useState(true);
    const refresh = useRef<boolean>(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        try {
            setIsEnd(false);
            refresh.current = true;
            setRefreshing(true);
            currentPage.current = 1;
            setTimeout(async () => {
                await fetchAllCourt(currentPage.current);
                setRefreshing(false);
            }, 1000);
        } catch (error) {
            console.log("OnRefresh catching: ", error);
        }
    }

    const onEndReached = () => {
        if (isEnd || !isLoaded) return;
        currentPage.current = currentPage.current + 1;
        fetchAllCourt(currentPage.current)
            .catch(e => {
                if (e.response.data.errors[0] === 'Courts are not found') {
                    setIsEnd(true);
                }
            });
    }
    const fetchAllCourt = async (pageNumber: number) => {
        const params = {
            Name: search == "" ? undefined : search,
            PageSize: 5,
            PageNumber: pageNumber
        }
        const data =
            //search === "" ? await axiosInstance.get('/court-groups/') :
            await axiosInstance.get('/court-groups/search', {params});
        if (refresh.current || isInit) {
            setSearchResult(data.data.value.items);
            refresh.current = false;
            setIsInit(false);
            return;
        }
        setSearchResult([...searchResult, ...data.data.value.items]);

    }

    useEffect(() => {
        setIsLoaded(false);
        currentPage.current = 1;
        fetchAllCourt(currentPage.current)
            .then(() => setIsLoaded(true))
            .catch(e => console.log("fetchAllCourt catching: ",e));

    }, [search]);

    const handleSearch = (text: string) => {
        setSearch(text);
    }

    if (!isLoaded) {
        return (
            <SafeAreaView className={"justify-center items-center h-full"}>
                <ActivityIndicator size="large" color="black"/>
                <Text className="text-center text-black font-pmedium text-lg">
                    Loading....
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
                        initialNumToRender={pageSize}
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
                        // this function will be called when user scroll to the end of the list
                        onEndReached={onEndReached}
                        // this value is used to determine how far from the end of the list to trigger onEndReached
                        onEndReachedThreshold={0.1}

                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    />
                </View>
        </SafeAreaView>
    );
};

export default Search;