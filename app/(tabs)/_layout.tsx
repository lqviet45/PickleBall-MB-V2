import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from 'react';
import icons from '@/constants/icons';
import Settings from "@/app/(tabs)/settings";
import Home from "@/app/(tabs)/home";
import Order from "@/app/(order)/order";
import Search from "@/app/(tabs)/search";

interface TabIconProps {
    icon: any;
    color: string;
    name: string;
    focused: boolean;
}

const TabIcon = ({icon, color, name, focused}: TabIconProps) => {
    return (
        <View className="items-center justify-center gap-1">
            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className={`${focused ? 'w-5 h-5' : 'w-7 h-7'}`}
            />

            {focused ? <Text className={"font-psemibold text-xs"} style={{color: color}}>{name}</Text> : null}

        </View>
    )
}

const TagsLayout = () => {
    const Tabs = createBottomTabNavigator();
    return (
        <Tabs.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: '#ADE603',
                tabBarInactiveTintColor: '#08222F',
                tabBarStyle: {
                    backgroundColor: '#FFF',
                    borderTopWidth: 1,
                    borderTopColor: '#FFF',
                    height: 60,
                    position: 'absolute',
                    bottom: 25,
                    marginHorizontal: 20,
                    borderRadius: 50,
                }
            }}

        >
            <Tabs.Screen
                name='home'
                component={Home}
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon icon={icons.home}
                                 color={color}
                                 name="Home"
                                 focused={focused}/>
                    ),
                    unmountOnBlur: false
                }}
            />
            <Tabs.Screen
                name='search'
                component={Search}
                options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon icon={icons.search}
                                 color={color}
                                 name="Search"
                                 focused={focused}/>
                    )
                }}
            />

            <Tabs.Screen
                name='(order)/order'
                component={Order}
                options={{
                    title: 'Booking',
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon icon={icons.order}
                                 color={color}
                                 name="Booking"
                                 focused={focused}/>
                    )
                }}
            />

            <Tabs.Screen
                name='settings'
                component={Settings}
                options={{
                    title: 'settings',
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon icon={icons.profile}
                                 color={color}
                                 name="Settings"
                                 focused={focused}/>
                    ),

                }}
            />
        </Tabs.Navigator>
    )
}

export default TagsLayout