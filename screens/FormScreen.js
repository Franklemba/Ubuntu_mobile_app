import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Modal, ActivityIndicator, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthContext";
import axios from 'axios';
import { BlurView } from "expo-blur";
import CustomButton from "../components/CustomButton";

// Icon imports
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';


const FormScreen = () => {
  const { userDetails } = useAuth();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    previousTreatments: '',
    specialistAppointments: '',
    medications: '',
    allergies: '',
    recentSkinTreatments: '',
    healthConditions: '',
    doctorType: '',
    consultationReason: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const apiEndpoint = "https://ubuntuserver-7wbg.onrender.com/consultation/submit";

  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (Object.values(formData).some(value => value === '')) {
        Alert.alert("Error", "All fields are required.");
        return;
      }

      const fields = {
        ...formData,
        patientName: userDetails.name,
        patientId: userDetails._id,
        patientEmail: userDetails.email,
        patientPhone: userDetails.mobileNumber
      };

      const response = await axios.post(apiEndpoint, fields, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        Alert.alert("Success", "Consultation submitted successfully");
        setFormData({
          previousTreatments: '',
          specialistAppointments: '',
          medications: '',
          allergies: '',
          recentSkinTreatments: '',
          healthConditions: '',
          doctorType: 'Cardiologist',
          consultationReason: '',
        });
        navigation.navigate("consultationRequest");
      }
    } catch (error) {
      console.error("Request Error:", error);
      Alert.alert("Error", `Failed to submit consultation: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderInputField = (name, placeholder, iconComponent) => (
    <View style={styles.inputContainer}>
      {iconComponent}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={formData[name]}
        onChangeText={(value) => handleChange(name, value)}
        multiline
        numberOfLines={4}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Seek consultation</Text>
          
          {renderInputField('doctorType', 'Doctor Type', <MaterialIcons name="local-hospital" size={24} color="#00b894" />)}
          {renderInputField('previousTreatments', 'Previous treatments or surgeries', <Fontisto name="surgical-knife" size={24} color="#00b894" />)}
          {renderInputField('specialistAppointments', 'Specialist appointments', <MaterialIcons name="event" size={24} color="#00b894" />)}
          {renderInputField('medications', 'Medications', <FontAwesome name="medkit" size={24} color="#00b894" />)}
          {renderInputField('allergies', 'Allergies', <FontAwesome name="warning" size={24} color="#00b894" />)}
          {renderInputField('recentSkinTreatments', 'Recent skin treatments', <MaterialIcons name="healing" size={24} color="#00b894" />)}
          {renderInputField('healthConditions', 'Current health conditions', <MaterialIcons name="favorite" size={24} color="#00b894" />)}
          {renderInputField('consultationReason', 'Reason for consultation', <MaterialIcons name="question-answer" size={24} color="#00b894" />)}
          
          <CustomButton title="Submit" onPress={handleSubmit} />
          
          {isLoading && (
            <Modal transparent={true} animationType="slide" visible={isLoading}>
              <BlurView
                intensity={100}
                style={styles.loadingContainer}
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
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
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
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    paddingVertical: 5,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  pickerIcon: {
    paddingLeft: 10,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  pickerButtonText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  doneButton: {
    backgroundColor: '#00b894',
    padding: 10,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 184, 147, 0.103)",
  },
});

export default FormScreen;