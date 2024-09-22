import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const DoctorCard = ({ doctor }) => {
  return (
    <View style={styles.card}>

      <Text style={styles.name}>{doctor.name}</Text>
      <Text style={styles.specialty}>Specialty {doctor.specialty}</Text>
      <Text style={styles.location}>Phonenumber: {doctor.mobileNumber}</Text>
      <Text style={styles.experience}>Email: {doctor.email}</Text>
    </View>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  photo: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  specialty: {
    fontSize: 14,
    color: "#00b894",
    marginTop: 5,
  },
  location: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
  experience: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
});
