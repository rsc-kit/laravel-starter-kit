"use client";

import { Form } from "@rsc-kit/core/form";
import { Honeypot } from "@rsc-kit/core/honeypot";
import InputError from "@/components/input-error";
import PasswordInput from "@/components/password-input";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import * as registration from "@/server-actions/registration";

export function RegisterForm({ passwordRules }: { passwordRules: string }) {
    return (
        <Form action={registration.store} className="flex flex-col gap-6">
            {({ pending, error, formError }) => (
                <>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                name="name"
                                placeholder="Full name"
                            />
                            <InputError
                                message={error("name")}
                                className="mt-2"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                name="email"
                                placeholder="email@example.com"
                            />
                            <InputError message={error("email")} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <PasswordInput
                                id="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                name="password"
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
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                name="password_confirmation"
                                placeholder="Confirm password"
                                passwordrules={passwordRules}
                            />
                            <InputError
                                message={error("password_confirmation")}
                            />
                        </div>

                        <Honeypot />

                        <InputError message={formError} role="alert" />
                        <Button
                            type="submit"
                            disabled={pending}
                            className="mt-2 w-full"
                            tabIndex={5}
                            data-test="register-user-button"
                        >
                            {pending && <Spinner />}
                            Create account
                        </Button>
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <TextLink href="/login" tabIndex={6}>
                            Log in
                        </TextLink>
                    </div>
                </>
            )}
        </Form>
    );
}
