import type { Metadata } from "@rsc-kit/core/metadata";
import { Suspense } from "react";
import { AuthStatus } from "@/components/auth-status";
import PasskeyVerify from "@/components/passkey-verify";
import AuthLayout from "@/layouts/auth-layout";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Log in" };

export default async function Login() {
    const { canResetPassword, canRegister } = await rpc<{
        canResetPassword: boolean;
        canRegister: boolean;
    }>("Shared.auth");

    return (
        <AuthLayout
            title="Log in to your account"
            description="Enter your email and password below to log in"
        >
            <PasskeyVerify />

            <LoginForm
                canResetPassword={canResetPassword}
                canRegister={canRegister}
            />

            <Suspense>
                <AuthStatus />
            </Suspense>
        </AuthLayout>
    );
}
