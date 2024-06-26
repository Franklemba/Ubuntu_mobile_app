import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const CardiologistScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/8413299/pexels-photo-8413299.jpeg?auto=compress&cs=tinysrgb&w=1600' }}
        style={styles.image}
      />
      <Text style={styles.title}>Cardiologist</Text>
      <Text style={styles.description}>
        A cardiologist is a doctor who specializes in diagnosing and treating heart conditions and diseases. They help manage patients' heart health, providing treatment plans and lifestyle recommendations to prevent and treat cardiovascular issues.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CardiologistScreen;
