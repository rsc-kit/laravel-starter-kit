'use client';

import { Form } from '@rsc-kit/core/form';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import * as session from '@/server-actions/session';
import * as verification from '@/server-actions/verification';

export function ResendForm() {
    return (
        <div className="space-y-6 text-center">
            <Form action={verification.send}>
                {({ pending }) => (
                    <Button disabled={pending} variant="secondary">
                        {pending && <Spinner />}
                        Resend verification email
                    </Button>
                )}
            </Form>

            <Form action={session.destroy}>
                <button
                    type="submit"
                    className="mx-auto block text-sm text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                >
                    Log out
                </button>
            </Form>
        </div>
    );
}
