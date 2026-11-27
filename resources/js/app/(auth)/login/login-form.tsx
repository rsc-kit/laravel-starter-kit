"use client";

import { Form } from "@rsc-kit/core/form";
import { Honeypot } from "@rsc-kit/core/honeypot";
import InputError from "@/components/input-error";
import PasswordInput from "@/components/password-input";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import * as session from "@/server-actions/session";

export function LoginForm({
    canResetPassword,
    canRegister,
}: {
    canResetPassword: boolean;
    canRegister: boolean;
}) {
    return (
        <Form action={session.store} className="flex flex-col gap-6">
            {({ pending, error, formError }) => (
                <>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                placeholder="email@example.com"
                            />
                            <InputError message={error("email")} />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                {canResetPassword && (
                                    <TextLink
                                        href="/forgot-password"
                                        className="ml-auto text-sm"
                                        tabIndex={5}
                                    >
                                        Forgot your password?
                                    </TextLink>
                                )}
                            </div>
                            <PasswordInput
                                id="password"
                                name="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                placeholder="Password"
                            />
                            <InputError message={error("password")} />
                        </div>

                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="remember"
                                name="remember"
                                tabIndex={3}
                            />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>

                        <Honeypot />

                        <InputError message={formError} role="alert" />
                        <Button
                            type="submit"
                            className="mt-4 w-full"
                            tabIndex={4}
                            disabled={pending}
                            data-test="login-button"
                        >
                            {pending && <Spinner />}
                            Log in
                        </Button>
                    </div>

                    {canRegister && (
                        <div className="text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <TextLink href="/register" tabIndex={5}>
                                Sign up
                            </TextLink>
                        </div>
                    )}
                </>
            )}
        </Form>
    );
}
