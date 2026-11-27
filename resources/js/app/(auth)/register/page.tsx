import type { Metadata } from '@rsc-kit/core/metadata';
import AuthLayout from '@/layouts/auth-layout';
import { RegisterForm } from './register-form';

export const metadata: Metadata = { title: 'Register' };

export default async function Register() {
    const { passwordRules } = await rpc<{ passwordRules: string }>(
        'Shared.auth',
    );

    return (
        <AuthLayout
            title="Create an account"
            description="Enter your details below to create your account"
        >
            <RegisterForm passwordRules={passwordRules} />
        </AuthLayout>
    );
}
