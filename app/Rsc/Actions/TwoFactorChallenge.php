<?php

namespace App\Rsc\Actions;

use Illuminate\Routing\Attributes\Controllers\Middleware;
use Laravel\Fortify\Http\Controllers\TwoFactorAuthenticatedSessionController;
use Laravel\Fortify\Http\Requests\TwoFactorLoginRequest;

/**
 * The second step of signing in, for someone Fortify's login sent on: the
 * challenged user is in the session, and the code or recovery code finishes it.
 */
class TwoFactorChallenge
{
    #[Middleware('guest')]
    #[Middleware('throttle:two-factor')]
    public function store(TwoFactorLoginRequest $request, TwoFactorAuthenticatedSessionController $fortify): mixed
    {
        return $fortify->store($request);
    }
}
