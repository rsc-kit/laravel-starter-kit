"use client";

import { Form } from "@rsc-kit/core/form";
import { useRef } from "react";
import Heading from "@/components/heading";
import InputError from "@/components/input-error";
import PasswordInput from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import * as password from "@/server-actions/settings/password";

export function PasswordForm({ passwordRules }: { passwordRules: string }) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const form = useRef<HTMLFormElement>(null);

    return (
        <div className="space-y-6">
            <Heading
                variant="small"
                title="Update password"
                description="Ensure your account is using a long, random password to stay secure"
            />

            <Form
                action={password.update}
                ref={form}
                onError={(errors) => {
                    // A refused password is not left in the fields.
                    form.current?.reset();

                    if (errors.password) {
                        passwordInput.current?.focus();
                    }

                    if (errors.current_password) {
                        currentPasswordInput.current?.focus();
                    }
                }}
                className="space-y-6"
            >
                {({ error, pending, formError }) => (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="current_password">
                                Current password
                            </Label>

                            <PasswordInput
                                id="current_password"
                                ref={currentPasswordInput}
                                name="current_password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                placeholder="Current password"
                            />

                            <InputError message={error("current_password")} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">New password</Label>

                            <PasswordInput
                                id="password"
                                ref={passwordInput}
                                name="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="New password"
                                passwordrules={passwordRules}
                            />

                            <InputError message={error("password")} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">
                                Confirm password
                            </Label>

                            <PasswordInput
                                id="password_confirmation"
                                name="password_confirmation"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="Confirm password"
                                passwordrules={passwordRules}
                            />

                            <InputError
                                message={error("password_confirmation")}
                            />
                        </div>

                        <InputError message={formError} role="alert" />
                        <div className="flex items-center gap-4">
                            <Button
                                disabled={pending}
                                data-test="update-password-button"
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
