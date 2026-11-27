import type { Metadata } from "@rsc-kit/core/metadata";
import { Suspense } from "react";
import { AuthStatus } from "@/components/auth-status";
import TextLink from "@/components/text-link";
import AuthLayout from "@/layouts/auth-layout";
import { ForgotPasswordForm } from "./forgot-password-form";

export const name = "password.request";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPassword() {
    return (
        <AuthLayout
            title="Forgot password"
            description="Enter your email to receive a password reset link"
        >
            <Suspense>
                <AuthStatus />
            </Suspense>

            <div className="space-y-6">
                <ForgotPasswordForm />

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>Or, return to</span>
                    <TextLink href="/login">log in</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
