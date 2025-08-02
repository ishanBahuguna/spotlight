

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InitialLayout from "@/components/InitialLayout";
// import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
// import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";

import { StatusBar } from "expo-status-bar";
import Providers from "@/providers/providers";
import React from "react";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

//   const onLayoutRootView = useCallback(async () => {
//     if (fontsLoaded) await SplashScreen.hideAsync();
//   }, [fontsLoaded]);

useEffect(() => {
    async function prepare() {
        await SplashScreen.preventAutoHideAsync();
    }

    prepare();
} , [])

if(!fontsLoaded) return undefined;
else SplashScreen.hideAsync();

  // update the native navigation bar on Android.
//   useEffect(() => {
//     if (Platform.OS === "android") {
//       NavigationBar.setBackgroundColorAsync("#000000");
//       NavigationBar.setButtonStyleAsync("light");
//     }
//   }, []);

  return (
    <Providers>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
      {/* <StatusBar style="light" /> */}
    </Providers>
  );
}
