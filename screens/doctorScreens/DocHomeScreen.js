import { StyleSheet,
   Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView
   } from 'react-native'
import { BlurView } from "expo-blur";
import PatientCard from "../../components/PatientCard";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../AuthContext";


const DocHomeScreen = () => {

  const [consultations, setConsultations] = useState([]);
  const { userDetails } = useAuth();

  useEffect(() => {
    // Fetch consultation requests from backend
    axios.get('http://localhost:5000/consultationRequests')
      .then(response => {
        console.log(response.data)
        // Check if the response is an array
        setConsultations(response.data.requests);
      })
      .catch(error => {
        console.error('Error fetching consultation requests:', error);
      });
  }, []);


  const handleViewProfile = () => {
    // Navigate to the form screen with the selected doctor's data
      navigation.navigate('Profile')
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    {/* <View style={styles.topContainer}>
          </View> */}
      {userDetails ? (

      <View style={styles.container}>
            <BlurView intensity={20} style={styles.blurContainer}>
              <Text style={styles.greetingName}>Hello, Doc {userDetails.name}</Text>
              <TouchableOpacity 
              onPress = {handleViewProfile}
              >
              <Image
                source={require("../../assets/avatar.png")}
                style={styles.avatar}
              />
              </TouchableOpacity>
            </BlurView>
     

        <Text style={styles.title}>All Consultations</Text>
        <ScrollView
          contentContainerStyle={styles.doctorList}
          showsVerticalScrollIndicator={false}
        >
          {consultations.map((consultation) => (
            <PatientCard key={consultation._id} consultation={consultation} />
          ))}
        </ScrollView>
      </View>
      ):(
        <Text style={styles.title}>Please log in to view your profile.</Text>
      )}

    </SafeAreaView>
  );
}

export default DocHomeScreen

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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
  
  consultationList: {
    marginBottom: 20,
  },
  consultationCard: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  consultationText: {
    fontSize: 16,
    marginBottom: 5,
  },
  learnMoreButton: {
    backgroundColor: "#00b894",
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  learnMoreButtonText: {
    color: "white",
    fontWeight: "bold",
    marginRight: 5,
  },
  doctorMoreInfo: {
    alignItems: "flex-end",
    marginTop: 10,
    marginRight: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
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
   
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
avatar: {
    height: 40,
    width: 40,
    borderRadius: 30,
  },
  greetingName: {
    fontSize: 20,
    fontWeight: "bold",
   color: "#000000",
  }
});

