import { View, Text, Image, TouchableOpacity } from "react-native";

import { styles } from "@/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function login() {

    const {startSSOFlow} = useSSO();
    const router = useRouter();


    const handleGoogleSignin = async () => {
        try {
            const {createdSessionId , setActive} = await startSSOFlow({strategy:"oauth_google"})

            if(setActive && createdSessionId) {
                setActive({session:createdSessionId})
                router.replace("/(tabs)");
            }
        } catch(error) {
            console.error("OAuth error : " , error)
        }
    }


    return (
        <View style={styles.container}>
            {/* Brand Section  */}
            <View style={styles.brandSection}>
                <View style={styles.logoContainer}>
                    <Ionicons name="leaf" size={32} color={COLORS.primary} />
                </View>
                <Text style={styles.appName}>spotlight</Text>
                <Text style={styles.tagline}>don't miss anything</Text>
            </View>

            {/* Illustration Section */}
            <View style={styles.illustrationContainer}>
                <Image
                    resizeMode="cover"
                    style={styles.illustration}
                    source={require("@/assets/images/auth-logo.png")}
                />
            </View>

            {/* Login Section */}
            <View style={styles.loginSection}>
            
                <TouchableOpacity
                    style={styles.googleButton}
                    onPress={handleGoogleSignin}
                    activeOpacity={0.9}
                >
                    <View style={styles.googleIconContainer}>
                        <Ionicons
                            name="logo-google"
                            size={20}
                            color={COLORS.surface}
                        />
                    </View>
                    <Text style={styles.googleButtonText}>Continue with Google</Text>
                </TouchableOpacity>

                <Text style={styles.termsText}>By continuing , you agree to our terms and Privacy Policy</Text>
            </View>
        </View>
    );
}
