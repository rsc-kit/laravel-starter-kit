"use client";

import { Form } from "@rsc-kit/core/form";
import { useAction } from "@rsc-kit/core/useAction";
import { toast } from "sonner";
import Heading from "@/components/heading";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as profile from "@/server-actions/settings/profile";
import * as verification from "@/server-actions/verification";
import type { User } from "@/types";

type Props = {
    user: User;
    mustVerifyEmail: boolean;
    status: string | null;
};

export function ProfileForm({ user, mustVerifyEmail, status }: Props) {
    // Its own post, not the form's: Fortify answers back() with the status.
    const resend = useAction(verification.send);

    return (
        <div className="space-y-6">
            <Heading
                variant="small"
                title="Profile"
                description="Update your name and email address"
            />

            <Form
                action={profile.update}
                resetOnSuccess={false}
                onSuccess={(message) => toast.success(message)}
                className="space-y-6"
            >
                {({ pending, error, formError }) => (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                defaultValue={user.name}
                                name="name"
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />

                            <InputError
                                className="mt-2"
                                message={error("name")}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                defaultValue={user.email}
                                name="email"
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError
                                className="mt-2"
                                message={error("email")}
                            />
                        </div>

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div>
                                <p className="-mt-4 text-sm text-muted-foreground">
                                    Your email address is unverified.{" "}
                                    <button
                                        type="button"
                                        onClick={() => resend.execute()}
                                        disabled={resend.isPending}
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to re-send the verification
                                        email.
                                    </button>
                                </p>

                                {status === "verification-link-sent" && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to
                                        your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <InputError message={formError} role="alert" />
                        <div className="flex items-center gap-4">
                            <Button
                                disabled={pending}
                                data-test="update-profile-button"
                            >
                                Save
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
}
