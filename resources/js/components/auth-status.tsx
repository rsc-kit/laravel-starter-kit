/** What Fortify flashed for this page, such as "Your password has been reset". */
export async function AuthStatus() {
    const status = await rpc<string | null>('Shared.status');

    if (!status) {
        return null;
    }

    return (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
            {status}
        </div>
    );
}
