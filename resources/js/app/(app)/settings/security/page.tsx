import type { Metadata } from "@rsc-kit/core/metadata";
import { AppSidebarHeader } from "@/components/app-sidebar-header";
import { FlashToast } from "@/components/flash-toast";
import type { Props as ManagePasskeysProps } from "@/components/manage-passkeys";
import ManagePasskeys from "@/components/manage-passkeys";
import type { Props as ManageTwoFactorProps } from "@/components/manage-two-factor";
import ManageTwoFactor from "@/components/manage-two-factor";
import SettingsLayout from "@/layouts/settings/layout";
import type { FlashToast as Toast } from "@/types/ui";
import { PasswordForm } from "./password-form";

export const name = "security.edit";

export const metadata: Metadata = { title: "Security settings" };

type Settings = { passwordRules: string } & ManagePasskeysProps &
    ManageTwoFactorProps;

export default async function Security() {
    const [props, toast] = await Promise.all([
        rpc<Settings>("Security.settings"),
        rpc<Toast | null>("Shared.toast"),
    ]);

    return (
        <>
            <AppSidebarHeader
                breadcrumbs={[
                    { title: "Security settings", href: "/settings/security" },
                ]}
            />
            <FlashToast toast={toast} />

            <SettingsLayout>
                <h1 className="sr-only">Security settings</h1>

                <PasswordForm passwordRules={props.passwordRules} />

                <ManageTwoFactor
                    canManageTwoFactor={props.canManageTwoFactor}
                    requiresConfirmation={props.requiresConfirmation}
                    twoFactorEnabled={props.twoFactorEnabled}
                />

                <ManagePasskeys
                    canManagePasskeys={props.canManagePasskeys}
                    passkeys={props.passkeys}
                />
            </SettingsLayout>
        </>
    );
}
