import React, {useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, View} from "react-native";
import CourtCardVertical from "@/components/CourtCardVertical";
import {CourtGroup} from "@/model/courtGroup";

const Search = () => {
    let [courts, setCourts] = useState<CourtGroup[]>([]);

    return (
        <SafeAreaView className={"bg-white h-full"}>
            <ScrollView>
                {/*Search bar*/}

                {/*Search result*/}
                <View>
                    <CourtCardVertical
                        courtId={'10d7c12e-95fe-485a-8756-39a559bb3a4a'}
                        courtImage={'https://via.placeholder.com/150'}
                        rating={4.5}
                        courtName={'Sân A'}
                        time={'08:00 - 16:00'}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Search;