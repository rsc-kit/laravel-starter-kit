import type { Metadata } from "@rsc-kit/core/metadata";
import { AppSidebarHeader } from "@/components/app-sidebar-header";
import DeleteUser from "@/components/delete-user";
import { FlashToast } from "@/components/flash-toast";
import SettingsLayout from "@/layouts/settings/layout";
import type { User } from "@/types";
import type { FlashToast as Toast } from "@/types/ui";
import { ProfileForm } from "./profile-form";

export const name = "profile.edit";

export const metadata: Metadata = { title: "Profile settings" };

export default async function Profile() {
    const [user, mustVerifyEmail, status, toast] = await Promise.all([
        rpc<User>("Shared.user"),
        rpc<boolean>("Shared.mustVerifyEmail"),
        rpc<string | null>("Shared.status"),
        rpc<Toast | null>("Shared.toast"),
    ]);

    return (
        <>
            <AppSidebarHeader
                breadcrumbs={[
                    { title: "Profile settings", href: "/settings/profile" },
                ]}
            />
            <FlashToast toast={toast} />

            <SettingsLayout>
                <h1 className="sr-only">Profile settings</h1>

                <ProfileForm
                    user={user}
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                />

                <DeleteUser />
            </SettingsLayout>
        </>
    );
}
