import type { Metadata } from '@rsc-kit/core/metadata';
import { Suspense } from 'react';
import AuthLayout from '@/layouts/auth-layout';
import { ResendForm } from './resend-form';

// Where `verified` sends someone who has not, and the url Fortify's
// notification links back to.
export const name = 'verification.notice';

export const metadata: Metadata = { title: 'Email verification' };

export default function VerifyEmail() {
    return (
        <AuthLayout
            title="Email verification"
            description="Please verify your email address by clicking on the link we just emailed to you."
        >
            <Suspense>
                <LinkSent />
            </Suspense>

            <ResendForm />
        </AuthLayout>
    );
}

async function LinkSent() {
    const status = await rpc<string | null>('Shared.status');

    if (status !== 'verification-link-sent') {
        return null;
    }

    return (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
            A new verification link has been sent to the email address you
            provided during registration.
        </div>
    );
}
