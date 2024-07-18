import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import HomeScreen from "../screens/doctorScreens/DocHomeScreen";
import ProfileScreen from "../screens/doctorScreens/ProfileScreen";
import ViewAppointmentsScreen from "../screens/doctorScreens/ViewAppointmentsScreen";
import AppointmentDetailsScreen from "../screens/doctorScreens/AppointmentDetailsScreen";
import PatientListScreen from "../screens/doctorScreens/PatientListScreen";
import PatientDetailsScreen from "../screens/doctorScreens/PatientDetailsScreen";
import ChatScreen from '../screens/ChatScreen';
import ChatDetail from '../screens/ChatDetail';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ChatStack = () =>{
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ title: "Chats" }}
      />
      <Stack.Screen
        name="ChatDetail"
        component={ChatDetail}
        options={{ title: "Chat detail" }}
      />
    </Stack.Navigator>
  );
}

const AppointmentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ViewAppointments"
        component={ViewAppointmentsScreen}
        options={{
          title: "Appointments",
        }}
      />
      <Stack.Screen
        name="AppointmentDetails"
        component={AppointmentDetailsScreen}
        options={{
          title: "Appointment Details",
        }}
      />
    </Stack.Navigator>
  );
};

const PatientListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PatientList"
        component={PatientListScreen}
        options={{
          title: "Patients",
        }}
      />
      <Stack.Screen
        name="PatientDetails"
        component={PatientDetailsScreen}
        options={{
          title: "Patient Details",
        }}
      />
    </Stack.Navigator>
  );
};

const DocAppNavigation = () => {
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
        name="Appointments"
        component={AppointmentStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event-available" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-ellipses" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Patients"
        component={PatientListStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
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

    </Tab.Navigator>
  );
};

export default DocAppNavigation;