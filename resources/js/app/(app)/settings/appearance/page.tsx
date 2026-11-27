import type { Metadata } from "@rsc-kit/core/metadata";
import { AppSidebarHeader } from "@/components/app-sidebar-header";
import AppearanceTabs from "@/components/appearance-tabs";
import Heading from "@/components/heading";
import SettingsLayout from "@/layouts/settings/layout";

export const name = "appearance.edit";

export const metadata: Metadata = { title: "Appearance settings" };

export default function Appearance() {
    return (
        <>
            <AppSidebarHeader
                breadcrumbs={[
                    { title: "Appearance settings", href: "/settings/appearance" },
                ]}
            />

            <SettingsLayout>
                <h1 className="sr-only">Appearance settings</h1>

                <div className="space-y-6">
                    <Heading
                        variant="small"
                        title="Appearance settings"
                        description="Update the appearance settings for your account"
                    />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </>
    );
}
