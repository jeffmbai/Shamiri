import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { AuthProvider, AuthContext } from '../components/AuthContext';
import HomeScreen from './home';
import ProfileScreen from './profile';
import SummaryScreen from './summary';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddJournal from './Forms/AddJournal';
import JournalDetails from './screens/journaldetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

function BottomTabNavigator() {
  const { token } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (!token) {
      navigation.replace('Login');
    }
  }, [token]);

  if (!token) {
    return null; // or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#DF00BC',
          inactiveTintColor: '#9C00E4',
          style: styles.tabBarStyle,
          labelStyle: styles.tabLabel,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Summary"
          component={SummaryScreen}
          options={{
            tabBarLabel: 'Summary',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="receipt-long" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="JournalDetails"
          component={JournalDetails}
          options={{
            tabBarButton: () => null,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="journal" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="AddJournal"
          component={AddJournal}
          options={{
            tabBarButton: () => null,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="add" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </QueryClientProvider>
  );
}

export default function BottomTab() {
  return (
    <AuthProvider>
      <BottomTabNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#000',
    borderTopWidth: 1,
    borderTopColor: '#1F1F1F',
    height: 60,
  },
  tabLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
});
