import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

export default function Providers({children} : {children:React.ReactNode}) {
    const convex = new ConvexReactClient(
        process.env.EXPO_PUBLIC_CONVEX_URL!,
        {
            unsavedChangesWarning: false,
        }
    );
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

    if (!publishableKey) {
        throw new Error(
            "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
        );
    }
    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
            <ConvexProviderWithClerk
                client={convex}
                useAuth={useAuth}
            >
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}
