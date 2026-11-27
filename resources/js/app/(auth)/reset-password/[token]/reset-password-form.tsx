"use client";

import { Form } from "@rsc-kit/core/form";
import InputError from "@/components/input-error";
import PasswordInput from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import * as password from "@/server-actions/password";

type Props = {
    token: string;
    email: string;
    passwordRules: string;
};

export function ResetPasswordForm({ token, email, passwordRules }: Props) {
    return (
        <Form action={password.reset}>
            {({ pending, error, formError }) => (
                <div className="grid gap-6">
                    <input type="hidden" name="token" value={token} />

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={email}
                            className="mt-1 block w-full"
                            readOnly
                        />
                        <InputError message={error("email")} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            className="mt-1 block w-full"
                            autoFocus
                            placeholder="Password"
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
                            autoComplete="new-password"
                            className="mt-1 block w-full"
                            placeholder="Confirm password"
                            passwordrules={passwordRules}
                        />
                        <InputError
                            message={error("password_confirmation")}
                            className="mt-2"
                        />
                    </div>

                    <InputError message={formError} role="alert" />
                    <Button
                        type="submit"
                        className="mt-4 w-full"
                        disabled={pending}
                        data-test="reset-password-button"
                    >
                        {pending && <Spinner />}
                        Reset password
                    </Button>
                </div>
            )}
        </Form>
    );
}
