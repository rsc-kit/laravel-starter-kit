<?php

namespace App\Rsc\Actions;

use Illuminate\Routing\Attributes\Controllers\Middleware;
use Laravel\Passkeys\Actions\DeletePasskey;
use Laravel\Passkeys\Http\Controllers\PasskeyRegistrationController;
use Laravel\Passkeys\Passkey;

/**
 * Removing a passkey from the security settings page, through the passkeys
 * package's own controller: it checks the passkey is the visitor's.
 * Registering one stays the package's browser flow.
 */
#[Middleware('auth')]
#[Middleware('password.confirm')]
#[Middleware('throttle:passkeys')]
class Passkeys
{
    public function destroy(int $id, PasskeyRegistrationController $passkeys, DeletePasskey $delete): mixed
    {
        return $passkeys->destroy(Passkey::query()->findOrFail($id), $delete);
    }
}
