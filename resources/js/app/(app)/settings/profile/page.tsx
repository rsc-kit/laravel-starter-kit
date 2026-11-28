import type { Metadata } from "@rsc-kit/core/metadata";
import { Suspense } from "react";
import { AppSidebarHeader } from "@/components/app-sidebar-header";
import DeleteUser from "@/components/delete-user";
import { Skeleton } from "@/components/ui/skeleton";
import SettingsLayout from "@/layouts/settings/layout";
import type { User } from "@/types";
import { ProfileForm } from "./profile-form";

export const name = "profile.edit";

export const metadata: Metadata = { title: "Profile settings" };

// The page is stored at build; only the form, which shows the visitor's own
// name and email, waits on Laravel.
export default function Profile() {
    return (
        <>
            <AppSidebarHeader
                breadcrumbs={[
                    { title: "Profile settings", href: "/settings/profile" },
                ]}
            />

            <SettingsLayout>
                <h1 className="sr-only">Profile settings</h1>

                <Suspense fallback={<ProfileFormSkeleton />}>
                    <SignedInProfile />
                </Suspense>

                <DeleteUser />
            </SettingsLayout>
        </>
    );
}

async function SignedInProfile() {
    const [user, mustVerifyEmail, status] = await Promise.all([
        rpc<User>("Shared.user"),
        rpc<boolean>("Shared.mustVerifyEmail"),
        rpc<string | null>("Shared.status"),
    ]);

    return (
        <ProfileForm
            user={user}
            mustVerifyEmail={mustVerifyEmail}
            status={status}
        />
    );
}

function ProfileFormSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-64" />
            </div>
            {[0, 1].map((field) => (
                <div key={field} className="grid gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-9 w-full" />
                </div>
            ))}
            <Skeleton className="h-9 w-16" />
        </div>
    );
}
