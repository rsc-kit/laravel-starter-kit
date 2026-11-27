import type { Metadata } from "@rsc-kit/core/metadata";
import { Suspense } from "react";
import { AppSidebarHeader } from "@/components/app-sidebar-header";
import type { Props as ManagePasskeysProps } from "@/components/manage-passkeys";
import ManagePasskeys from "@/components/manage-passkeys";
import type { Props as ManageTwoFactorProps } from "@/components/manage-two-factor";
import ManageTwoFactor from "@/components/manage-two-factor";
import { SessionToast } from "@/components/session-toast";
import { Skeleton } from "@/components/ui/skeleton";
import SettingsLayout from "@/layouts/settings/layout";
import { PasswordForm } from "./password-form";

export const name = "security.edit";

export const metadata: Metadata = { title: "Security settings" };

type Settings = ManagePasskeysProps & ManageTwoFactorProps;

// The password form is the same for everyone and is stored at build; the
// visitor's two-factor state and passkeys wait on Laravel.
export default async function Security() {
    const { passwordRules } = await rpc<{ passwordRules: string }>("Shared.auth");

    return (
        <>
            <AppSidebarHeader
                breadcrumbs={[
                    { title: "Security settings", href: "/settings/security" },
                ]}
            />
            <Suspense>
                <SessionToast />
            </Suspense>

            <SettingsLayout>
                <h1 className="sr-only">Security settings</h1>

                <PasswordForm passwordRules={passwordRules} />

                <Suspense fallback={<SectionSkeleton />}>
                    <SignedInSecurity />
                </Suspense>
            </SettingsLayout>
        </>
    );
}

async function SignedInSecurity() {
    const props = await rpc<Settings>("Security.settings");

    return (
        <>
            <ManageTwoFactor
                canManageTwoFactor={props.canManageTwoFactor}
                requiresConfirmation={props.requiresConfirmation}
                twoFactorEnabled={props.twoFactorEnabled}
            />

            <ManagePasskeys
                canManagePasskeys={props.canManagePasskeys}
                passkeys={props.passkeys}
            />
        </>
    );
}

function SectionSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-72" />
            </div>
            <Skeleton className="h-9 w-32" />
        </div>
    );
}
