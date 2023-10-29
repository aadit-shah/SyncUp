import { ConvexProvider, ConvexReactClient } from "convex/react";
import "react-native-get-random-values";
import { CONVEX_URL } from "@env";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Events from "./Events";
const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});
import { ClerkProvider, useUser, useAuth, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Constants from "expo-constants"
import SignInScreen from "./components/SignInScreen";
import * as SecureStore from "expo-secure-store";


const tokenCache = {
    getToken(key) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

function SignOut() {
    const { isLoaded, signOut } = useAuth();
    if (!isLoaded) {
      return null;
    }
    return (
        <div>
        <button onClick={SignOut()}>Sign out</button>
        </div>
    );
}
  
function EventScreen() {
    return (
        <SafeAreaView>
            <ScrollView>
            <Text style={styles.header}>Upcoming Events</Text>
            <ConvexProvider client={convex}>
                <Events />
            </ConvexProvider>
            </ScrollView>
        </SafeAreaView>
    );
}

function TaskScreen() {
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
            <ConvexProvider client={convex}>
                <Tasks />
            </ConvexProvider>
        </View>
    );
}



const Stack = createNativeStackNavigator();


export default function App() {
    return (
    <ClerkProvider tokenCache={tokenCache} publishableKey="pk_test_c2F2ZWQtZ29iYmxlci04NC5jbGVyay5hY2NvdW50cy5kZXYk">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <EventScreen />
        </View>
    </ClerkProvider>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f5f5f5',
      align: "center",
    },
    header: {
      flex: 1, 
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    cardTitle: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    cardInfo: {
      fontSize: 14,
      color: 'gray',
    },
  });