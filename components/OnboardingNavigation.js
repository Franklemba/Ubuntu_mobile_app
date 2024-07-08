import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "../screens/SignupScreen";
import SigninScreen from "../screens/signIn";
import HomeScreen from "../screens/HomeScreen";
import DocHomeScreen from "../screens/doctorScreens/DocHomeScreen";
import { useAuth } from "../AuthContext"; // Import the useAuth hook

const Stack = createStackNavigator();

const OnboardingNavigation = () => {
  const { updateAuthentication } = useAuth(); // Access the updateAuthentication function from the AuthContext

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signin"
        component={SigninScreen}
        options={{ headerShown: false }}
        initialParams={{ updateAuthentication }} // Pass the updateAuthentication function as a parameter
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClientHome"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorHome"
        component={DocHomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigation;
