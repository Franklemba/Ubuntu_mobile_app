import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DoctorListsScreen from "../screens/DoctorListsScreen";
import DoctorDetailsScreen from "../screens/DoctorDetailsScreen";
import AppointmentBookingScreen from "../screens/AppointmentBookingScreen";
import ViewAppointmentsScreen from "../screens/ViewAppointmentsScreen";
import FormScreen from "../screens/FormScreen";
import DermaScreen from "../screens/specialistDetails/dermaScreen";
import CardiologistScreen from "../screens/specialistDetails/CardiologistScreen";
import ConsultationRequestScreen from "../screens/ConsultationRequestScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const ConsultationStack = () =>{
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="consultationMain"
        component={FormScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="consultationRequest"
        component={ConsultationRequestScreen}
        options={{ title: "Request Sent" }}
      />
    </Stack.Navigator>
  );
}

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dermatologist"
        component={DermaScreen}
        options={{ title: 'Dermatologist' }}
      />
      <Stack.Screen
        name="Cardiologist"
        component={CardiologistScreen}
        options={{ title: 'Cardiologist' }}
      />
    </Stack.Navigator>
  );
};


const DoctorDetailsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DoctorLists"
      component={DoctorListsScreen}
      options={{
         tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
          headerShown: false,
         }}
    />
    <Stack.Screen
      name="DoctorDetails"
      component={DoctorDetailsScreen}
      options={{ 
          headerShown: false,
      }}
    />
    {/* Add more screens related to doctor details if needed */}
  </Stack.Navigator>
);


const AppNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Consultation"
        component={ConsultationStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-hospital" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Doctors list"
        component={DoctorDetailsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="DoctorDetails"
        component={DoctorDetailsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      /> */}

      
    </Tab.Navigator>
  );
};

export default AppNavigation;
