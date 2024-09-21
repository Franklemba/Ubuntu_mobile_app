import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
// import { FontAwesome5 } from "react-native-vector-icons";
// import { FontAwesome } from "react-native-vector-icons";
import Featured from "../components/Featured";
import Recommendations from "../components/Recommendations";
// import DoctorsList from "../components/DoctorsList";
import ServicesList from "../components/ServicesList";
// import TestimonialList from "../components/TestimonialList";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthContext";

const HomeScreen = () => {
  const navigation = useNavigation(); 
  const { userDetails } = useAuth();
  const handleViewForm = () => {
    // Navigate to the form screen with the selected doctor's data
      navigation.navigate('Consultation')
  };

  const handleViewProfile = () => {
    // Navigate to the form screen with the selected doctor's data
      navigation.navigate('Profile')
  };

  return (
    
    <SafeAreaView style={{ flex: 1 }}>

     {userDetails ? (
        <>
        <ScrollView>
        <ImageBackground
          source={require("../assets/HomeGradientTopBG.jpg")}
          style={styles.topImgBG}
        >
          <View style={styles.topContainer}>
            <BlurView intensity={20} style={styles.blurContainer}>
              <Text style={styles.greetingName}>Hello, {userDetails.name}</Text>
              <TouchableOpacity 
              onPress = {handleViewProfile}
              >
              <Image
                source={require("../assets/avatar.png")}
                style={styles.avatar}
              />
              </TouchableOpacity>
            </BlurView>
            <View style={styles.TextAndSearchContainer}>
              {/* Contact Information Section */}
              {/* <View style={styles.contactInfoContainer}>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={() => {
                    // Add the code to initiate a call here
                  }}
                >
                  <FontAwesome5 name="phone" size={20} color="#00b894" />
                  <Text style={styles.contactButtonText}>
                    Call us at: 0912345678
                  </Text>
                </TouchableOpacity>
              </View> */}
              {/* <Text style={styles.greetingSearch}>Find your doctor</Text> */}
              
              <TouchableOpacity 
              style={styles.bookButton}
              onPress = {handleViewForm}
              >
                <Text style={styles.bookButtonText}>Seek Consultation</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* Card Slider */}
        <View style={styles.cardContainer}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Featured Medical Specialties 
          </Text>
          {/* Featured Section */}
          <Featured />
          {/* Recommendation Section */}
          <Recommendations />

          {/* Our Doctors Section */}
          {/* <DoctorsList /> */}
        </View>
        {/* Services Section */}
        <ServicesList />
        {/* Testimonial Section */}
        {/* <TestimonialList /> */}
      </ScrollView>
        </>
      ) : (
        <Text style={styles.title}>Please log in to view your profile.</Text>
      )}

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topImgBG: {
    height: 265,
    width: "100%",
    overflow: "hidden",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 1,
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
  },
  blurContainer: {
    elevation: 10,
    // top: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  greetingName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 30,
  },
  TextAndSearchContainer: {
    width: "90%",
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
    height: 40,
  },
  greetingSearch: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "right",
  },
  input: {
    marginLeft: 10,
    width: "80%",
  },
  bookButton: {
    backgroundColor: "#fff",
    borderRadius: 30,
    marginTop: 20,
    padding: 10,
    alignItems: "center",
    width: "100%",
  },
  bookButtonText: {
    fontSize: 16,
    color: "#00b894",
    fontWeight: "bold",
  },
  contactInfoContainer: {
    alignItems: "center",
    padding: 10,
  },
  contactButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  contactButtonText: {
    fontSize: 16,
    color: "#00b894",
    marginLeft: 10,
    fontWeight: "bold",
  },
  cardContainer: {
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
