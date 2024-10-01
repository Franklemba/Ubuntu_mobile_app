import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Modal, ActivityIndicator, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import axios from 'axios';
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthContext";

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
    doctorType: 'Cardiologist',
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

  const renderInputField = (name, placeholder, icon) => (
    <View style={styles.inputContainer}>
      {icon}
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder={placeholder}
        value={formData[name]}
        onChangeText={(value) => handleChange(name, value)}
        multiline
        numberOfLines={4}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Seek consultation</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="local-hospital" size={24} color="#00b894" />
            <Picker
              style={styles.picker}
              selectedValue={formData.doctorType}
              onValueChange={(itemValue) => handleChange('doctorType', itemValue)}
            >
              <Picker.Item label="Cardiologist" value="Cardiologist" />
              <Picker.Item label="Dermatologist" value="Dermatologist" />
              <Picker.Item label="Neurologist" value="Neurologist" />
              <Picker.Item label="Pediatrician" value="Pediatrician" />
              <Picker.Item label="Orthopedic Surgeon" value="Orthopedic Surgeon" />
            </Picker>
          </View>
          {renderInputField('previousTreatments', 'Previous treatments or surgeries', <Fontisto name="surgical-knife" size={24} color="#00b894" />)}
          {renderInputField('specialistAppointments', 'Specialist appointments', null)}
          {renderInputField('medications', 'Medications', <FontAwesome6 name="user-doctor" size={36} color="black" />)}
          {renderInputField('allergies', 'Allergies', <FontAwesome5 name="allergies" size={24} color="#00b894" />)}
          {renderInputField('recentSkinTreatments', 'Recent skin treatments', <AntDesign name="skin" size={24} color="#00b894" />)}
          {renderInputField('healthConditions', 'Current health conditions', <MaterialIcons name="health-and-safety" size={24} color="#00b894" />)}
          {renderInputField('consultationReason', 'Reason for consultation', null)}
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
  picker: {
    flex: 1,
    marginLeft: 10,
    height: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 184, 147, 0.103)",
  },
});

export default FormScreen;