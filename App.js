import { ConvexProvider, ConvexReactClient } from "convex/react";
import "react-native-get-random-values";
import { CONVEX_URL } from "@env";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Events from "./Events";
const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

function EventScreen() {
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
            <ConvexProvider client={convex}>
                <Events />
            </ConvexProvider>
        </View>
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
    <NavigationContainer>{
        <Stack.Navigator>
        <Stack.Screen name="Events" component={EventScreen} />
        <Stack.Screen name="Tasks" component={TaskScreen} />
        </Stack.Navigator>
    }</NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
