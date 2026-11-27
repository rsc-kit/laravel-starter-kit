"use client";

import { Form } from "@rsc-kit/core/form";
import { Honeypot } from "@rsc-kit/core/honeypot";
import { LoaderCircle } from "lucide-react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as password from "@/server-actions/password";

export function ForgotPasswordForm() {
    return (
        <Form action={password.email}>
            {({ pending, error, formError }) => (
                <>
                    <Honeypot />

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            autoFocus
                            placeholder="email@example.com"
                        />

                        <InputError message={error("email")} />
                    </div>

                    <InputError message={formError} role="alert" />
                    <div className="my-6 flex items-center justify-start">
                        <Button
                            className="w-full"
                            disabled={pending}
                            data-test="email-password-reset-link-button"
                        >
                            {pending && (
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                            )}
                            Email password reset link
                        </Button>
                    </div>
                </>
            )}
        </Form>
    );
}
