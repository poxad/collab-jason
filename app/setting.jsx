import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Button,
	Image,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Link } from "expo-router";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome";
const SettingsScreen = () => {
	// Sample initial profile data
	const [profileData, setProfileData] = useState({
		name: "Anna Jones",
		bio: "Passionate about technology and design. Always looking for new opportunities to learn and grow.",
		profilePicture:
			"https://i0.wp.com/global.ac.id/wp-content/uploads/2015/04/speaker-3-v2.jpg?fit=768%2C768&ssl=1",
	});

	const [newName, setNewName] = useState(profileData.name);
	const [newBio, setNewBio] = useState(profileData.bio);
	const [newProfilePicture, setNewProfilePicture] = useState(
		profileData.profilePicture
	);

	const handleUpdate = () => {
		// Update the profileData state with new values
		setProfileData({
			...profileData,
			name: newName,
			bio: newBio,
			profilePicture: newProfilePicture,
		});

		// You might want to save these changes to a backend here
		alert("Profile updated successfully!");
	};

	const pickImage = async () => {
		// Ask the user for the permission to access media library
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			alert("Sorry, we need camera roll permissions to make this work!");
			return;
		}

		// Let the user pick an image
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setNewProfilePicture(result.uri);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.headerWithSettings}>
				<TouchableOpacity>
					<Link href="/profile">
						<Icon name="arrow-left" size={24} color={COLORS.black} />
					</Link>
				</TouchableOpacity>
				<Text style={styles.profileTop}>SETTINGS</Text>
			</View>
			<View style={styles.profilePictureContainer}>
				<Image
					source={{ uri: newProfilePicture }}
					style={styles.profilePicture}
				/>
				<TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
					<Text style={styles.uploadButtonText}>Change Picture</Text>
				</TouchableOpacity>
			</View>
			<TextInput
				style={styles.input}
				placeholder="Name"
				value={newName}
				onChangeText={setNewName}
			/>
			<TextInput
				style={styles.input}
				placeholder="Bio"
				multiline
				numberOfLines={4}
				value={newBio}
				onChangeText={setNewBio}
			/>
			<TextInput
				style={styles.input}
				placeholder="Profile Picture URL"
				value={newProfilePicture}
				onChangeText={setNewProfilePicture}
			/>
			<Button title="Save Changes" onPress={handleUpdate} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	headerWithSettings: {
		flexDirection: "row",
		justifyContent: "space-between", // This will align items to the edges
		alignItems: "center", // Vertically align the text and the icon
		marginBottom: SIZES.medium,
	},
	profileTop: {
		fontSize: SIZES.medium,
		fontWeight: FONT.bold,
		color: COLORS.black,
		marginBottom: SIZES.medium,
		marginTop: SIZES.xSmall,
		marginRight: "40%",
		textAlign: "center",
	},
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f8f8f8",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	profilePictureContainer: {
		alignItems: "center",
		marginBottom: 20,
	},
	profilePicture: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 10,
	},
	uploadButton: {
		backgroundColor: "#007BFF",
		padding: 10,
		borderRadius: 5,
	},
	uploadButtonText: {
		color: "#fff",
		fontSize: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 5,
		padding: 10,
		marginBottom: 20,
		backgroundColor: "#fff",
	},
});

export default SettingsScreen;
