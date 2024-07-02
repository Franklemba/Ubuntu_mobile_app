import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, Alert, Platform, KeyboardAvoidingView, Modal, ActivityIndicator } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { BlurView } from "expo-blur";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
const FormScreen = () => {
  const [name, setName] = useState('');
  // const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [doctorType, setDoctorType] = useState('Cardiologist'); // Default doctor type
  const navigation = useNavigation();
  const apiEndpoint = "http://localhost:5000/consultation/submit";

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try{
      setIsLoading(true); // Start loading

      if (!name || !email || !message || !doctorType) {
        Alert.alert("Error", "All fields are required.");
        throw new Error("All fields are required.");
        }
  
        const fields = {
          name,
          email,
          message,
          doctorType
        }
    
          const response = await axios.post(apiEndpoint, fields);

          if(response.status === 400 ){
             console.log("error error")
          }
    
          if (response.status === 201) {
            Alert.alert("Success", "Consultation submitted successfully");
            // Reset the form
            setName('');
            setEmail('');
            setMessage('');
            setDoctorType('Cardiologist');

            Alert.alert("Success", "Consultation submitted successfully");
            navigation.navigate("consultationRequest");
          }
        
      // Handle form submission logic here
      console.log("Form submitted with:", { name, email, message, doctorType });
      // Example: You might want to submit this data to an API or perform other actions

    }catch(error){
      if (axios.isAxiosError(error)) {
          console.log(error.message);
      } else {
        console.error("Request Error:", error.message);
        // Handle other errors
      }
    } finally {
      setIsLoading(false); // Stop loading
    }

  };

  
  return (
    <View style={styles.container}>
 
      <Text style={styles.title}>Seek consultation</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={24} color="#00b894" />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={24} color="#00b894" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
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
          placeholder="Write about your proble here...."
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />
      </View>
      {/* <TouchableOpacity 
       style={styles.submitButton}
       onPress={handleSubmit}
       >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity> */}
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
    label: {
      fontSize: 16,
      marginLeft: 10,
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
