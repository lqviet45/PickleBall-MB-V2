import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from 'react';
import icons from '@/constants/icons';
import Settings from "@/app/(tabs)/settings";
import Home from "@/app/(tabs)/home";
import Order from "@/app/(order)/order";

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
                className='w-6 h-6'
            />

            <Text className={`${focused ? 'font-psemibold'
                : 'font-pregular'} text-xs`} style={{color: color}}>{name}</Text>

        </View>
    )
}

const TagsLayout = () => {
    const Tabs = createBottomTabNavigator();
    return (
        <Tabs.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FFA001',
                tabBarInactiveTintColor: '#CDCDE0',
                tabBarStyle: {
                    backgroundColor: '#232533',
                    borderTopWidth: 1,
                    borderTopColor: '#232533',
                    height: 60,
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
                    )
                }}
            />
        </Tabs.Navigator>
    )
}

export default TagsLayout