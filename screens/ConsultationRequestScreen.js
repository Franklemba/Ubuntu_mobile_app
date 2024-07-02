import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ConsultationRequestScreen = () => {
  return (
    <View style={styles.container}>
     
      <View style={styles.content}>
        <Text style={styles.title}>Request Sent</Text>
        <Text style={styles.description}>
          Please wait patiently for a Doctor to respond to your request
        </Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
});

export default ConsultationRequestScreen;
