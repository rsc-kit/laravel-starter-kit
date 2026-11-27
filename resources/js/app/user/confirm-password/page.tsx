import type { Metadata } from "@rsc-kit/core/metadata";
import PasskeyVerify from "@/components/passkey-verify";
import AuthLayout from "@/layouts/auth-layout";
import { ConfirmPasswordForm } from "./confirm-password-form";

// Where Laravel's password.confirm middleware sends someone whose
// confirmation has lapsed.
export const name = "password.confirm";

export const metadata: Metadata = { title: "Confirm password" };

export default function ConfirmPassword() {
    return (
        <AuthLayout
            title="Confirm password"
            description="This is a secure area of the application. Please confirm your password before continuing."
        >
            <PasskeyVerify
                routes={{
                    options: "/passkeys/confirm/options",
                    submit: "/passkeys/confirm",
                }}
                label="Confirm with passkey"
                loadingLabel="Confirming..."
                separator="Or confirm with password"
            />

            <ConfirmPasswordForm />
        </AuthLayout>
    );
}
