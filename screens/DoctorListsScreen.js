import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState,useEffect } from "react";
import DoctorCard from "../components/DoctorCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import axios from 'axios';
const DoctorListsScreen = () => {
  const [doctorsData, setDoctorsData] = useState([]); // State to store doctors from the backend

  
  useEffect(() => {
    // Fetch the doctors from the backend when the component mounts
    const fetchDoctors = async () => {
      try {
        // http://localhost:5000
        const response = await axios.get(`https://ubuntuserver-7wbg.onrender.com/users/doctors`)

          setDoctorsData(response.data.doctors); // Update state with fetched doctors
      
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  // Generate categories from the unique categories found in doctorsData
  const categories = Array.from(
    new Set(doctorsData.flatMap((doctor) => doctor.specialty)) // Assuming specialty corresponds to categories
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
       

        <Text style={styles.title}>All Doctors</Text>
        <ScrollView
          contentContainerStyle={styles.doctorList}
          showsVerticalScrollIndicator={false}
        >
          {doctorsData.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DoctorListsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  doctorList: {
    flexDirection: "column",
    flexWrap: "wrap",
  
    height:'80%',
    gap:5
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchIcon: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  searchInput: {
    flex: 1,
  },
  categoryMenu: {
    marginTop: 10,
    height: 60, // Increase the height of the category menu
  },
  categoryButton: {
    backgroundColor: "#00b894",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    height: 40, // Increase the height of the category buttons
  },
  categoryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
