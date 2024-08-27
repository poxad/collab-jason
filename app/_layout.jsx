import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabBar from "../components/TabBar";

const _layout = () => {
	return (
		<Tabs tabBar={(props) => <TabBar {...props} />}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
				}}
				screenOptions={{ headerShown: false }}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "Explore",
				}}
				screenOptions={{ headerShown: false }}
			/>
			<Tabs.Screen
				name="community"
				options={{
					title: "Community",
				}}
				screenOptions={{ headerShown: false }}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="setting"
				options={{
					title: "Setting",
					headerShown: false,
				}}
			/>
		</Tabs>
	);
};

export default _layout;
