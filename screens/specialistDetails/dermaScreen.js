import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DermaScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/5355897/pexels-photo-5355897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Dermatologist</Text>
        <Text style={styles.description}>
          A dermatologist is a doctor who specializes in conditions involving the skin, hair, and nails. They diagnose and treat a wide variety of skin ailments, from acne to skin cancer.
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

export default DermaScreen;
