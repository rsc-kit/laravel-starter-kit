import type { Metadata } from "@rsc-kit/core/metadata";
import type { PageProps } from "@rsc-kit/core/route-schema";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AuthLayout from "@/layouts/auth-layout";
import { ResetPasswordForm } from "./reset-password-form";

// The url Fortify's reset email links to: route('password.reset', [token, email]).
export const name = "password.reset";

export const metadata: Metadata = { title: "Reset password" };

export default function ResetPassword({ params, searchParams }: PageProps) {
    return (
        <AuthLayout
            title="Reset password"
            description="Please enter your new password below"
        >
            <Suspense fallback={<FieldsSkeleton />}>
                <Fields params={params} searchParams={searchParams} />
            </Suspense>
        </AuthLayout>
    );
}

// The token and the email are the link's, so the form waits on the url; the
// heading above it does not.
async function Fields({ params, searchParams }: PageProps) {
    const [{ token }, query, { passwordRules }] = await Promise.all([
        params,
        searchParams,
        rpc<{ passwordRules: string }>("Shared.auth"),
    ]);

    return (
        <ResetPasswordForm
            token={token}
            email={query.get("email") ?? ""}
            passwordRules={passwordRules}
        />
    );
}

function FieldsSkeleton() {
    return (
        <div className="grid gap-6">
            {[0, 1, 2].map((i) => (
                <div key={i} className="grid gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-9 w-full" />
                </div>
            ))}
            <Skeleton className="mt-4 h-9 w-full" />
        </div>
    );
}
