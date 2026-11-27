"use client";

import { Form } from "@rsc-kit/core/form";
import InputError from "@/components/input-error";
import PasswordInput from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import * as password from "@/server-actions/password";

export function ConfirmPasswordForm() {
    return (
        <Form action={password.confirm}>
            {({ pending, error, formError }) => (
                <div className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput
                            id="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            autoFocus
                        />

                        <InputError message={error("password")} />
                    </div>

                    <InputError message={formError} role="alert" />
                    <div className="flex items-center">
                        <Button
                            className="w-full"
                            disabled={pending}
                            data-test="confirm-password-button"
                        >
                            {pending && <Spinner />}
                            Confirm password
                        </Button>
                    </div>
                </div>
            )}
        </Form>
    );
}
