import React, { useState, useEffect }  from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DoctorListsScreen from "../screens/DoctorListsScreen";
import DoctorDetailsScreen from "../screens/DoctorDetailsScreen";
import FormScreen from "../screens/FormScreen";
import DermaScreen from "../screens/specialistDetails/dermaScreen";
import CardiologistScreen from "../screens/specialistDetails/CardiologistScreen";
import ConsultationRequestScreen from "../screens/ConsultationRequestScreen";
import ChatScreen from '../screens/ChatScreen';
import ChatDetail from '../screens/ChatDetail';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useAuth } from "../AuthContext";

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
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const { userDetails } = useAuth();
  const fetchUnreadMessages = async () => {
    try {
        const apiEndpoint = "https://ubuntuserver-7wbg.onrender.com/"
        // const response = await fetch(`http://localhost:5000/consultation/messageCount/${userDetails._id}`); // Replace with your API URL
     
        const response = await fetch(`http://ubuntuserver-7wbg.onrender.com/consultation/messageCount/${userDetails._id}`); // Replace with your API URL
      const data = await response.json();

   console.log(data)
        setUnreadMessagesCount(data);
      
    } catch (error) {
      console.error('Error fetching unread messages:', error);
    }
  };

  useEffect(() => {
    fetchUnreadMessages();

    // Optionally, use a polling mechanism to regularly check for new messages
    const interval = setInterval(() => {
      fetchUnreadMessages();
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);
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
        name="Chat"
        component={ChatStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-ellipses" size={size} color={color} />
          ),
          headerShown: false,
          tabBarBadge: unreadMessagesCount // Show badge if there are unread messages
      
        }}
      />
      <Tab.Screen
        name="Doctors"
        component={DoctorDetailsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user-doctor" size={size} color= {color} />
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

export default AppNavigation;