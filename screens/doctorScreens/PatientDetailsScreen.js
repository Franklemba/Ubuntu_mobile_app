import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientDetailsScreen = ({route}) => {

  const [userDetails, setUserDetails] = useState([]);

  const { consultation } = route.params ?? {};
  useEffect(() => {
    // Fetch consultation requests from backend

    axios.get(`http://localhost:5000/users/${consultation.patientId}`)
      .then(response => {
        console.log(response.data)
        // Check if the response is an array
        setUserDetails(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  const navigation = useNavigation(); // Initialize navigation

  const handleGoBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.backButton}>
      <Button title="Go Back"  onPress={handleGoBack} />
    </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {!consultation ? (
          <View style={styles.noDataContainer}>
            <Image
              source={require("../../assets/dataNotFound.jpg")}
              style={styles.noDataImage}
            />

            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Patient Details Not Found
            </Text>
            <CustomButton title="Select a doctor" onPress={handleViewProfile} />
          </View>
        ) : (
          <>
            {/* Top Section */}
            <View style={styles.topContainer}>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1672906035342-8dbcde9cfcdc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D" }}
                style={styles.doctorImage}
              />
              <Text style={styles.doctorName}>
               Name: {userDetails ? userDetails.name : "Patient Name Not Found"}
                
              </Text>
            </View>

            {/* Middle Container with Icons */}
            <View style={styles.middleContainer}>
              {/* Location */}
              <View style={styles.box}>
                <View style={styles.locationContainer}>
                  <FontAwesome name="map-marker" size={30} color="#00b894" />
                  <Text style={styles.locationText}>
                      Doctor Type: {consultation.doctorType }
                  </Text>
                </View>
              </View>

             

              {/* Experience */}
              <View style={styles.box}>
                <View style={styles.experienceContainer}>
                  <Ionicons name="ios-briefcase" size={30} color="#636e72" />
                  <Text style={styles.experience}>
                    {consultation
                      ? `Medications: ${consultation.medications}`
                      : "medications Not Found"}
                  </Text>
                </View>
              </View>

             

              
            </View>

            {/* Bio Section */}
            <View style={styles.bioSection}>
              <Text style={styles.bio}>
               Consultation reason: {consultation.consultationReason}
              </Text>
              <Text style={styles.bio}>
                Previous Treatments: {consultation.previousTreatments}
              </Text>
              <Text style={styles.bio}>
                Patient Email: {userDetails.email}
              </Text>
              <Text style={styles.bio}>
                Patient Phone number: {userDetails.mobileNumber}
              </Text>
              
            </View>

            {/* Button to Book an Appointment */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.bookAppointmentButton}>
                <Text style={styles.bookAppointmentText}>Accept Consultation</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: "#fff",
  },
  topContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  doctorImage: {
    width: "100%",
    height: 370,
    resizeMode: "cover",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  doctorName: {
    paddingTop: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  middleContainer: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  box: {
    height: 100,
    width: 150,
    backgroundColor: "#fff",
    elevation: 3,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  locationContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#00b894",
    marginLeft: 5,
    fontWeight: "bold",
  },
  reviewsContainer: {
    alignItems: "center",
    flexDirection: "column",
  },
  reviewsText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f9ca24",
    marginLeft: 5,
  },
  experienceContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  experience: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#636e72",
    marginLeft: 5,
  },
  educationContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  education: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#130f40",
    marginLeft: 5,
  },
  languagesContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  languages: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4834d4",
    marginLeft: 5,
  },
  bioSection: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bio: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
    textAlign: "justify",
    fontWeight: "400",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    padding: 10,
  },
  bookAppointmentButton: {
    backgroundColor: "#00b894",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  bookAppointmentText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  noDataImage: {
    width: "100%",
    height: 370,
    resizeMode: "cover",
  },
  backButton:{
    backgroundColor: "#00b894"
  }
});




export default PatientDetailsScreen

