import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, Alert, Modal, ActivityIndicator, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthContext";

const FormScreen = () => {
  const { userDetails } = useAuth();

  const [previousTreatments, setPreviousTreatments] = useState('');
  const [specialistAppointments, setSpecialistAppointments] = useState('');
  const [medications, setMedications] = useState('');
  const [allergies, setAllergies] = useState('');
  const [recentSkinTreatments, setRecentSkinTreatments] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [doctorType, setDoctorType] = useState('Cardiologist'); // Default doctor type
  const [consultationReason, setConsultation] = useState('');
  const navigation = useNavigation();

  const apiEndpoint = "http://localhost:5000/consultation/submit";
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {

    try {
      
      setIsLoading(true); // Start loading

      if (!previousTreatments || !specialistAppointments || !medications || !allergies || !recentSkinTreatments || !healthConditions || !doctorType || !consultationReason) {
        Alert.alert("Error", "All fields are required.");
        throw new Error("All fields are required.");
      }

      const fields = {
        previousTreatments,
        specialistAppointments,
        medications,
        allergies,
        recentSkinTreatments,
        healthConditions,
        doctorType,
        consultationReason,
        patientName : userDetails.name,
        patientId : userDetails._id
      }

      const response = await axios.post(apiEndpoint, fields, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response);

      if (response.status === 201) {
        Alert.alert("Success", "Consultation submitted successfully");
        // Reset the form
        setPreviousTreatments('');
        setSpecialistAppointments('');
        setMedications('');
        setAllergies('');
        setRecentSkinTreatments('');
        setHealthConditions('');
        setDoctorType('Cardiologist');
        setConsultation('');
        navigation.navigate("consultationRequest");
        console.log(response.status);
      }

      console.log("Form submitted with:", { previousTreatments, specialistAppointments, medications, allergies, recentSkinTreatments,consultationReason ,healthConditions, doctorType});

         

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        console.error("Axios error response:", error.response);
        console.error("Response data:", error.response?.data);
        Alert.alert("Error", `Failed to submit consultation: ${error.message}`);
      } else {
        console.error("Request Error:", error.message);
        Alert.alert("Error", `Request Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Seek consultation</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="local-hospital" size={24} color="#00b894" />
              <Picker
                style={[styles.input, { height: 50 }]}
                selectedValue={doctorType}
                onValueChange={(itemValue) => setDoctorType(itemValue)}
              >
                <Picker.Item label="Cardiologist" value="Cardiologist" />
                <Picker.Item label="Dermatologist" value="Dermatologist" />
                <Picker.Item label="Neurologist" value="Neurologist" />
                <Picker.Item label="Pediatrician" value="Pediatrician" />
                <Picker.Item label="Orthopedic Surgeon" value="Orthopedic Surgeon" />
              </Picker>
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="ios-chatbubbles" size={24} color="#00b894" />
              <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Previous treatments or surgeries"
                value={previousTreatments}
                onChangeText={setPreviousTreatments}
                multiline
                numberOfLines={4}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="ios-chatbubbles" size={24} color="#00b894" />
              <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Specialist appointments"
                value={specialistAppointments}
                onChangeText={setSpecialistAppointments}
                multiline
                numberOfLines={4}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="ios-chatbubbles" size={24} color="#00b894" />
              <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Medications"
                value={medications}
                onChangeText={setMedications}
                multiline
                numberOfLines={4}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="ios-chatbubbles" size={24} color="#00b894" />
              <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Allergies"
                value={allergies}
                onChangeText={setAllergies}
                multiline
                numberOfLines={4}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="ios-chatbubbles" size={24} color="#00b894" />
              <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Recent skin treatments"
                value={recentSkinTreatments}
                onChangeText={setRecentSkinTreatments}
                multiline
                numberOfLines={4}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="ios-chatbubbles" size={24} color="#00b894" />
              <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Current health conditions"
                value={healthConditions}
                onChangeText={setHealthConditions}
                multiline
                numberOfLines={4}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="ios-chatbubbles" size={24} color="#00b894" />
              <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Reason for consultation"
                value={consultationReason}
                onChangeText={setConsultation}
                multiline
                numberOfLines={4}
              />
            </View>
            <CustomButton title={"Submit"} onPress={handleSubmit} />
            {isLoading && (
              <Modal transparent={true} animationType="slide" visible={isLoading}>
                <BlurView
                  intensity={100}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 184, 147, 0.103)",
                  }}
                >
                  <ActivityIndicator size="large" color="#00b894" />
                </BlurView>
              </Modal>
            )}
          </View>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#00b894',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default FormScreen;
