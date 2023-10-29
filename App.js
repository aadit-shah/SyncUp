import { ConvexProvider, ConvexReactClient } from "convex/react";
import "react-native-get-random-values";
import { CONVEX_URL } from "@env";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Events from "./Events";
const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
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

const SignOut = () => {
    const { isLoaded, signOut } = useAuth();
    if (!isLoaded) {
      return null;
    }
    return (
      React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          {
            onClick: function onClick() {
              signOut();
            }
          },
          "Sign Out"
        )
      )
    );
};
  
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
    <ClerkProvider tokenCache={tokenCache} publishableKey="pk_test_c2F2ZWQtZ29iYmxlci04NC5jbGVyay5hY2NvdW50cy5kZXYk">
        {/* <View style={styles.container}>
            <NavigationContainer>{
                <Stack.Navigator>
                <Stack.Screen name="Events" component={EventScreen} />
                <Stack.Screen name="Tasks" component={TaskScreen} />
                </Stack.Navigator>
            }</NavigationContainer>
        </View>  */}
    {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Some text</Text>
      <View>
        <Text>Some more text</Text>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{width: 200, height: 200}}
        />
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="You can type in me"
      />
    </View> */}
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <SignedIn>
            <Text>You are Signed in</Text>
            <SignOut/>
        </SignedIn>
        <SignedOut>
            <SignInScreen />
        </SignedOut>
    </View>
    </ClerkProvider>
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
