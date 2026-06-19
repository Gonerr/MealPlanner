"use client";

import SignInBlock from "@/features/auth/ui/signInForm";
import SignUpBlock from "@/features/auth/ui/signUpForm";
import { useState } from "react";

const LoginPage = () => {
    const [mode, setMode] = useState<"signin" | "signup">("signin");

    return (
        <div
            className="d-flex align-items-center justify-content-center bg-light"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100">
                {mode === "signin" ? (
                    <SignInBlock onSwitchToSignUp={() => setMode("signup")} />
                ) : (
                    <SignUpBlock onSwitchToSignIn={() => setMode("signin")} />
                )}
            </div>
        </div>
    );
};

export default LoginPage;
