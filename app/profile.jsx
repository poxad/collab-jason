import React, { useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	View,
	Text,
	Image,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Modal,
	TextInput,
	Button,
} from "react-native";
// import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Icon from "react-native-vector-icons/FontAwesome";
import { Link } from "expo-router";
const ProfileScreen = () => {
	// Dummy profile data
	const profile = {
		name: "Anna Jones",
		email: "annajones@gmail.com",
		points: 85,
		pointsDifference: 20,
		age: 25,
		gender: "Female",
		bio: "Passionate about technology and design. Always looking for new opportunities to learn and grow.",
		school: "Harvard University",
		hobbies: ["Reading", "Photography", "Traveling"],
		interests: ["Tech", "Design", "Gaming"],
		education: "Bachelor of Science in Computer Science",
		languages: ["English", "Spanish"],
		activities: ["Hackathon Winner", "Volunteer at Tech for Good"],
		skills: [
			{ name: "HTML/CSS", color: COLORS.tertiary },
			{ name: "Graphic Design", color: COLORS.secondary },
			{ name: "UX", color: COLORS.gray },
		],
		classmates: [
			{ name: "Tom", image: "https://randomuser.me/api/portraits/men/1.jpg" },
			{
				name: "Jane",
				image: "https://randomuser.me/api/portraits/women/1.jpg",
			},
			{
				name: "Sarah",
				image: "https://randomuser.me/api/portraits/women/2.jpg",
			},
			{ name: "Jan", image: "https://randomuser.me/api/portraits/men/2.jpg" },
		],
		profilePicture:
			"https://i0.wp.com/global.ac.id/wp-content/uploads/2015/04/speaker-3-v2.jpg?fit=768%2C768&ssl=1",
		projects: [
			{
				image: "https://via.placeholder.com/100",
				title: "Project 1",
				description: "A project about technology and design.",
			},
			{
				image: "https://via.placeholder.com/100",
				title: "Project 2",
				description: "An innovative solution for the tech industry.",
			},
		],
		socialMedia: {
			instagram: "https://www.instagram.com/annajones",
			twitter: "https://twitter.com/annajones",
			linkedin: "https://www.linkedin.com/in/annajones",
		},
	};

	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: "about", title: "About" },
		{ key: "experience", title: "Experience" },
	]);

	const renderScene = SceneMap({
		about: () => <AboutSection profile={profile} />,
		experience: () => <ExperienceSection profile={profile} />,
	});

	return (
		<SafeAreaView style={styles.container}>
			<GestureHandlerRootView style={styles.gestureHandlerContainer}>
				<ScrollView
					contentContainerStyle={{
						paddingBottom: 150,
						paddingTop: SIZES.large,
						paddingHorizontal: SIZES.medium,
					}}
				>
					<View style={styles.headerWithSettings}>
						<Text style={styles.profileTop}>PROFILE</Text>
						<TouchableOpacity>
							<Link href="/setting">
								<Icon name="cog" size={24} color={COLORS.black} />
							</Link>
						</TouchableOpacity>
					</View>
					<ProfileHeader profile={profile} />
					{/* Tab View */}
					<TabView
						navigationState={{ index, routes }}
						renderScene={renderScene}
						onIndexChange={setIndex}
						initialLayout={{ width: SIZES.medium }}
						renderTabBar={(props) => (
							<TabBar
								{...props}
								indicatorStyle={{ backgroundColor: COLORS.primary }}
								style={{ backgroundColor: COLORS.lightWhite }}
								labelStyle={{ color: COLORS.primary }}
							/>
						)}
					/>
					{/* <ProfileTab profile={} />| */}
					{/* <ExperienceSection /> */}
					{/* Classmates Section always at the bottom */}
					<ClassmatesSection classmates={profile.classmates} />
					<SocialMediaSection socialMedia={profile.socialMedia} />
				</ScrollView>
			</GestureHandlerRootView>
		</SafeAreaView>
	);
};

const AboutSection = ({ profile }) => {
	const [hobbies, setHobbies] = useState(profile.hobbies);
	const [languages, setLanguages] = useState(profile.languages);
	const [modalVisible, setModalVisible] = useState(false);
	const [languageModalVisible, setLanguageModalVisible] = useState(false);
	const [newHobby, setNewHobby] = useState("");
	const [newLanguage, setNewLanguage] = useState("");
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [editBio, setEditBio] = useState(profile.bio);
	const [editSchool, setEditSchool] = useState(profile.school);
	const [editAge, setEditAge] = useState(profile.age.toString());
	const [editGender, setEditGender] = useState(profile.gender);
	const addHobby = () => {
		if (newHobby.trim()) {
			setHobbies([...hobbies, newHobby]);
			setNewHobby("");
			setModalVisible(false);
		}
	};

	const addLanguage = () => {
		if (newLanguage.trim()) {
			setLanguages([...languages, newLanguage]);
			setNewLanguage("");
			setLanguageModalVisible(false);
		}
	};

	const saveEdit = () => {
		profile.bio = editBio;
		profile.school = editSchool;
		profile.age = parseInt(editAge, 10);
		profile.gender = editGender;
		setModalVisible(false);
	};

	return (
		<View style={styles.sectionContainer}>
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>Bio</Text>
				<TouchableOpacity onPress={() => setModalVisible(true)}>
					<Icon name="pencil" size={20} color={COLORS.primary} />
				</TouchableOpacity>
			</View>
			<Text style={styles.sectionContent}>{profile.bio}</Text>
			<Text style={styles.sectionTitle}>Personal Info</Text>
			<Text style={styles.sectionContent}>Age: {profile.age}</Text>
			<Text style={styles.sectionContent}>Gender: {profile.gender}</Text>
			<Text style={styles.sectionContent}>School: {profile.school}</Text>
			<Text style={styles.sectionContent}>Education: {profile.education}</Text>
			{/* Languages Section */}
			<Text style={styles.sectionTitle}>Languages</Text>

			<View style={styles.hobbiesContainer}>
				{languages.map((language, index) => (
					<TouchableOpacity key={index} style={styles.hobbyButton}>
						<Text style={styles.hobbyButtonText}>{language}</Text>
					</TouchableOpacity>
				))}
				<TouchableOpacity
					style={styles.addHobbyButton}
					onPress={() => setLanguageModalVisible(true)}
				>
					<Text style={styles.addHobbyButtonText}>+ Add Language</Text>
				</TouchableOpacity>
			</View>

			{/* Hobbies Section */}
			<Text style={styles.sectionTitle}>Hobbies</Text>
			<View style={styles.hobbiesContainer}>
				{hobbies.map((hobby, index) => (
					<TouchableOpacity key={index} style={styles.hobbyButton}>
						<Text style={styles.hobbyButtonText}>{hobby}</Text>
					</TouchableOpacity>
				))}
				<TouchableOpacity
					style={styles.addHobbyButton}
					onPress={() => setModalVisible(true)}
				>
					<Text style={styles.addHobbyButtonText}>+ Add Hobby</Text>
				</TouchableOpacity>
			</View>

			{/* Modal for Adding Hobbies */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.sectionTitle}>Add a hobby</Text>
						<TextInput
							style={styles.input}
							placeholder="Enter new hobby"
							value={newHobby}
							onChangeText={setNewHobby}
						/>
						<View style={styles.buttonContainer}>
							<Button
								title="Cancel"
								onPress={() => setModalVisible(false)}
								color="red"
							/>
							<Button title="Add Hobby" onPress={addHobby} />
						</View>
					</View>
				</View>
			</Modal>

			{/* Modal for Adding Languages */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={languageModalVisible}
				onRequestClose={() => setLanguageModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.sectionTitle}>Add a language</Text>
						<TextInput
							style={styles.input}
							placeholder="Enter new language"
							value={newLanguage}
							onChangeText={setNewLanguage}
						/>
						<View style={styles.buttonContainer}>
							<Button
								title="Cancel"
								onPress={() => setLanguageModalVisible(false)}
								color="red"
							/>
							<Button title="Add Language" onPress={addLanguage} />
						</View>
					</View>
				</View>
			</Modal>
			{/* Modal buat edit about section */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContentBottom}>
						<Text style={styles.sectionTitle}>Edit Bio</Text>
						<TextInput
							style={styles.input}
							value={editBio}
							onChangeText={setEditBio}
						/>
						<Text style={styles.sectionTitle}>Edit School</Text>
						<TextInput
							style={styles.input}
							value={editSchool}
							onChangeText={setEditSchool}
						/>
						<Text style={styles.sectionTitle}>Edit Age</Text>
						<TextInput
							style={styles.input}
							value={editAge}
							onChangeText={setEditAge}
							keyboardType="numeric"
						/>
						<Text style={styles.sectionTitle}>Edit Gender</Text>
						<TextInput
							style={styles.input}
							value={editGender}
							onChangeText={setEditGender}
						/>
						<View style={styles.buttonContainer}>
							<Button
								title="Cancel"
								onPress={() => setModalVisible(false)}
								color="red"
							/>
							<Button title="Save" onPress={saveEdit} />
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const ExperienceSection = ({ profile }) => {
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [editProjectTitle, setEditProjectTitle] = useState(
		profile.projects[0].title
	);
	const [editProjectDescription, setEditProjectDescription] = useState(
		profile.projects[0].description
	);

	// Save edited project
	const saveEdit = () => {
		profile.projects[0].title = editProjectTitle;
		profile.projects[0].description = editProjectDescription;
		setEditModalVisible(false);
	};

	return (
		<View style={styles.sectionContainer}>
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>Projects</Text>
				<TouchableOpacity onPress={() => setEditModalVisible(true)}>
					<Icon name="pencil" size={20} color={COLORS.primary} />
				</TouchableOpacity>
			</View>
			{profile.projects.map((project, index) => (
				<View key={index} style={styles.rectangle}>
					<View style={styles.projectContainer}>
						<Image
							source={{ uri: project.image }}
							style={styles.projectImage}
						/>
						<View style={styles.projectDetails}>
							<Text style={styles.projectTitle}>{project.title}</Text>
							<Text style={styles.projectDescription}>
								{project.description}
							</Text>
						</View>
					</View>
				</View>
			))}

			{/* Modal for editing Project */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={editModalVisible}
				onRequestClose={() => setEditModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.sectionTitle}>Edit Project Title</Text>
						<TextInput
							style={styles.input}
							value={editProjectTitle}
							onChangeText={setEditProjectTitle}
						/>
						<Text style={styles.sectionTitle}>Edit Project Description</Text>
						<TextInput
							style={styles.input}
							value={editProjectDescription}
							onChangeText={setEditProjectDescription}
						/>
						<View style={styles.buttonContainer}>
							<Button
								title="Cancel"
								onPress={() => setEditModalVisible(false)}
								color="red"
							/>
							<Button title="Save" onPress={saveEdit} />
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};
const ClassmatesSection = ({ classmates }) => (
	<View style={styles.classmatesContainer}>
		<Text style={styles.sectionTitle}>Classmates</Text>
		<FlatList
			data={classmates}
			horizontal
			keyExtractor={(item) => item.name}
			renderItem={({ item }) => (
				<View style={styles.classmate}>
					<Image source={{ uri: item.image }} style={styles.classmatePicture} />
					<Text style={styles.classmateName}>{item.name}</Text>
				</View>
			)}
		/>
	</View>
);

const ProfileHeader = ({ profile }) => {
	const [isFollowing, setIsFollowing] = useState(false);

	const toggleFollow = () => {
		setIsFollowing(!isFollowing);
	};

	return (
		<View style={styles.headerContainer}>
			<View style={styles.profileBackground}>
				<Image
					source={{ uri: profile.profilePicture }}
					style={styles.profilePicture}
				/>
				<Text style={styles.name}>{profile.name}</Text>
				<Text style={styles.email}>{profile.email}</Text>
				<TouchableOpacity
					style={[
						styles.followButton,
						{
							backgroundColor: isFollowing ? COLORS.primary : COLORS.gray,
						},
					]}
					onPress={toggleFollow}
				>
					<Text style={styles.followButtonText}>
						{isFollowing ? "Following" : "Follow"}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const SocialMediaSection = ({ socialMedia }) => (
	<View style={styles.socialMediaContainer}>
		<Text style={styles.sectionTitle}>Social Media</Text>

		{/* Wrap icons in a separate View to make them appear on a new line */}
		<View style={styles.iconContainer}>
			{/* Instagram */}
			<TouchableOpacity
				onPress={() => Linking.openURL(socialMedia.instagram)}
				style={styles.socialIconButton}
			>
				<Icon name="instagram" size={30} color={COLORS.primary} />
			</TouchableOpacity>

			{/* Twitter */}
			<TouchableOpacity
				onPress={() => Linking.openURL(socialMedia.twitter)}
				style={styles.socialIconButton}
			>
				<Icon name="twitter" size={30} color={COLORS.primary} />
			</TouchableOpacity>

			{/* LinkedIn */}
			<TouchableOpacity
				onPress={() => Linking.openURL(socialMedia.linkedin)}
				style={styles.socialIconButton}
			>
				<Icon name="linkedin" size={30} color={COLORS.primary} />
			</TouchableOpacity>
		</View>
	</View>
);

const styles = StyleSheet.create({
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: SIZES.small,
	},
	socialMediaContainer: {
		marginTop: SIZES.medium,
		alignItems: "flex-start", // Align the container to the left
	},
	socialMediaLabel: {
		fontSize: SIZES.medium,
		fontWeight: FONT.bold,
		color: COLORS.primary,
		marginBottom: SIZES.small,
	},
	iconContainer: {
		flexDirection: "row", // Arrange icons in a row
		justifyContent: "flex-start",
		marginTop: 10,
	},
	socialIconButton: {
		marginHorizontal: SIZES.small,
	},
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
		marginLeft: "40%",
		textAlign: "center",
	},
	container: {
		flex: 1,
		backgroundColor: COLORS.lightWhite,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: SIZES.medium,
	},

	gestureHandlerContainer: {
		flex: 1,
	},
	headerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: SIZES.medium,
		borderRadius: SIZES.large,
	},
	profileBackground: {
		width: "110%",
		padding: SIZES.medium,
		alignItems: "center",
		backgroundColor: "#A09AE3",
		borderRadius: SIZES.large,
	},
	profilePicture: {
		width: 80,
		height: 80,
		borderRadius: SIZES.xxLarge,
		marginBottom: SIZES.xSmall,
	},
	name: {
		fontSize: SIZES.xLarge,
		fontWeight: FONT.bold,
		color: COLORS.black,
	},
	email: {
		fontSize: SIZES.medium,
		color: COLORS.black,
		marginTop: SIZES.xSmall,
	},
	followButton: {
		marginTop: SIZES.medium,
		paddingHorizontal: SIZES.medium,
		paddingVertical: SIZES.small,
		borderRadius: SIZES.large,
	},
	followButtonText: {
		color: COLORS.white,
		fontSize: SIZES.medium,
		fontWeight: FONT.bold,
	},
	sectionContainer: {
		// marginBottom: SIZES.large,
	},
	sectionTitle: {
		fontSize: SIZES.large,
		fontWeight: FONT.bold,
		marginBottom: SIZES.small,
		marginTop: SIZES.small,
	},
	sectionContent: {
		fontSize: SIZES.medium,
		color: COLORS.gray,
		marginBottom: SIZES.xSmall,
	},
	rectangle: {
		// borderWidth: 1,
		backgroundColor: "#A1E4E8",
		borderColor: COLORS.primary,
		marginBottom: SIZES.medium,
		borderRadius: SIZES.large,
		padding: SIZES.medium,
	},
	classmatesContainer: {
		marginTop: SIZES.large,
	},
	classmatesLabel: {
		fontSize: SIZES.medium,
		color: COLORS.gray,
		marginBottom: SIZES.xSmall,
	},
	classmate: {
		alignItems: "center",
		marginRight: SIZES.medium,
	},
	classmatePicture: {
		width: 50,
		height: 50,
		borderRadius: SIZES.large,
		marginBottom: SIZES.xSmall,
	},
	classmateName: {
		fontSize: SIZES.small,
		color: COLORS.primary,
	},
	projectContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	projectImage: {
		width: 100,
		height: 100,
		borderRadius: SIZES.small,
		marginRight: SIZES.medium,
	},
	projectDetails: {
		flex: 1,
	},
	projectTitle: {
		fontSize: SIZES.large,
		fontWeight: FONT.bold,
		color: COLORS.primary,
	},
	projectDescription: {
		fontSize: SIZES.small,
		color: COLORS.gray,
		marginTop: SIZES.xSmall,
	},
	// Additional styles for AboutSection
	hobbiesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: SIZES.small,
	},
	hobbyButton: {
		backgroundColor: COLORS.primary,
		padding: SIZES.xSmall,
		borderRadius: SIZES.small,
		marginRight: SIZES.small,
		marginBottom: SIZES.small,
	},
	hobbyButtonText: {
		color: COLORS.white,
		fontSize: SIZES.small,
	},
	addHobbyButton: {
		backgroundColor: COLORS.gray,
		padding: SIZES.xSmall,
		borderRadius: SIZES.small,
		marginRight: SIZES.small,
		marginBottom: SIZES.small,
	},
	addHobbyButtonText: {
		color: COLORS.white,
		fontSize: SIZES.small,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: 300,
		padding: SIZES.medium,
		backgroundColor: COLORS.lightWhite,
		borderRadius: SIZES.small,
	},
	input: {
		borderWidth: 1,
		borderColor: SIZES.white,
		borderRadius: SIZES.medium,
		marginBottom: SIZES.medium,
		padding: SIZES.small,
	},
});

export default ProfileScreen;
