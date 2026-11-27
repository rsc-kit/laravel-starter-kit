"use client";

import { Form } from "@rsc-kit/core/form";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import AuthLayout from "@/layouts/auth-layout";
import { OTP_MAX_LENGTH } from "@/lib/two-factor";
import * as challenge from "@/server-actions/two-factor-challenge";

const modes = {
    code: {
        title: "Authentication code",
        description:
            "Enter the authentication code provided by your authenticator application.",
        toggleText: "login using a recovery code",
    },
    recovery: {
        title: "Recovery code",
        description:
            "Please confirm access to your account by entering one of your emergency recovery codes.",
        toggleText: "login using an authentication code",
    },
};

export function TwoFactorChallengeForm() {
    const [mode, setMode] = useState<keyof typeof modes>("code");
    const [code, setCode] = useState("");
    const content = modes[mode];

    const toggleMode = () => {
        setMode(mode === "code" ? "recovery" : "code");
        setCode("");
    };

    return (
        <AuthLayout title={content.title} description={content.description}>
            <div className="space-y-6">
                {/* Keyed by mode, so switching starts the form - and its errors - over. */}
                <Form key={mode} action={challenge.store} className="space-y-4">
                    {({ pending, error, formError }) => (
                        <>
                            {mode === "recovery" ? (
                                <>
                                    <Input
                                        name="recovery_code"
                                        type="text"
                                        placeholder="Enter recovery code"
                                        autoFocus
                                        required
                                    />
                                    <InputError
                                        message={error("recovery_code")}
                                    />
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-3 text-center">
                                    <div className="flex w-full items-center justify-center">
                                        <InputOTP
                                            name="code"
                                            maxLength={OTP_MAX_LENGTH}
                                            value={code}
                                            onChange={setCode}
                                            disabled={pending}
                                            pattern={REGEXP_ONLY_DIGITS}
                                            autoFocus
                                        >
                                            <InputOTPGroup>
                                                {Array.from(
                                                    { length: OTP_MAX_LENGTH },
                                                    (_, index) => (
                                                        <InputOTPSlot
                                                            key={index}
                                                            index={index}
                                                        />
                                                    ),
                                                )}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                    <InputError message={error("code")} />
                                </div>
                            )}

                            <InputError message={formError} role="alert" />
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={pending}
                            >
                                Continue
                            </Button>

                            <div className="text-center text-sm text-muted-foreground">
                                <span>or you can </span>
                                <button
                                    type="button"
                                    className="cursor-pointer text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    onClick={toggleMode}
                                >
                                    {content.toggleText}
                                </button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AuthLayout>
    );
}
