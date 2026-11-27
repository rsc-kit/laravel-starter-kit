import type { Metadata } from "@rsc-kit/core/metadata";
import { TwoFactorChallengeForm } from "./two-factor-challenge-form";

// Where Fortify's login sends someone with two-factor authentication on.
export const name = "two-factor.login";

export const metadata: Metadata = { title: "Two-factor authentication" };

export default function TwoFactorChallenge() {
    return <TwoFactorChallengeForm />;
}
