<?php

namespace App\Rsc;

use App\Http\Requests\Settings\TwoFactorAuthenticationRequest;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Laravel\Fortify\Features;

/** What the security settings page shows: two-factor state and passkeys. */
class Security
{
    /**
     * @return array{
     *     canManageTwoFactor: bool,
     *     canManagePasskeys: bool,
     *     passkeys: list<array{id: int, name: string, authenticator: string|null, created_at_diff: string, last_used_at_diff: string|null}>,
     *     twoFactorEnabled?: bool,
     *     requiresConfirmation?: bool,
     * }
     */
    #[Middleware('auth')]
    public function settings(TwoFactorAuthenticationRequest $request): array
    {
        $props = [
            'canManageTwoFactor' => Features::canManageTwoFactorAuthentication(),
            'canManagePasskeys' => Features::canManagePasskeys(),
            'passkeys' => Features::canManagePasskeys()
                ? array_values($request->user()
                    ->passkeys()
                    ->select(['id', 'name', 'credential', 'created_at', 'last_used_at'])
                    ->latest()
                    ->get()
                    ->map(fn ($passkey) => [
                        'id' => $passkey->id,
                        'name' => $passkey->name,
                        'authenticator' => $passkey->authenticator,
                        'created_at_diff' => $passkey->created_at->diffForHumans(),
                        'last_used_at_diff' => $passkey->last_used_at?->diffForHumans(),
                    ])
                    ->all())
                : [],
        ];

        if (Features::canManageTwoFactorAuthentication()) {
            $request->ensureStateIsValid();

            $props['twoFactorEnabled'] = $request->user()->hasEnabledTwoFactorAuthentication();
            $props['requiresConfirmation'] = Features::optionEnabled(Features::twoFactorAuthentication(), 'confirm');
        }

        return $props;
    }
}
