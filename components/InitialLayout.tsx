import { isEmailLinkError, useAuth } from "@clerk/clerk-expo";
import { useRouter, useSegments , Stack } from "expo-router";
import React from "react";
import { useEffect } from "react";

export default function InitialLayout() {
    const { isLoaded, isSignedIn } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) return;
  
        const inAuthScreen = segments[0] === "(auth)";
        
        if (!isSignedIn && !inAuthScreen) router.replace("/(auth)/login");
        else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
    }, [isLoaded, isSignedIn, segments]);

    if (!isLoaded) return null;
    
    // if any of the above routers are not used than this default screen will be shown
    return <Stack screenOptions={{ headerShown: false }} />;
}
