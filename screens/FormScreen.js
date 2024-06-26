import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, Alert } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const FormScreen = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [doctorType, setDoctorType] = useState('Cardiologist'); // Default doctor type
  const [priceRange, setPriceRange] = useState(500); // Default price range


  const handleSubmit = async () => {

    if (!name || !location || !email || !message || !doctorType || !priceRange) {
        Alert.alert('Validation Error', 'All fields are required');
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:5000/submit', {
          name,
          location,
          email,
          message,
          doctorType
        });
  
        if (response.status === 201) {
          Alert.alert('Success', 'Consultation submitted successfully');
          // Reset the form
          setName('');
          setLocation('');
          setEmail('');
          setMessage('');
          setDoctorType('Cardiologist');
        }
      } catch (error) {
        Alert.alert('Error', 'There was an error submitting your consultation');
      }
    // Handle form submission logic here
    console.log('Form submitted with:', { name, location, email, message, doctorType, priceRange });
    // Example: You might want to submit this data to an API or perform other actions
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
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
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
