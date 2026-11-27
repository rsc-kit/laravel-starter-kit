<?php

namespace App\Rsc\Actions;

use Illuminate\Http\Request;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Laravel\Fortify\Http\Controllers\EmailVerificationNotificationController;

/**
 * Another verification email, through Fortify's own controller: it answers
 * back() with the status the page shows.
 */
class Verification
{
    #[Middleware('auth')]
    #[Middleware('throttle:6,1')]
    public function send(Request $request, EmailVerificationNotificationController $fortify): mixed
    {
        return $fortify->store($request);
    }
}
