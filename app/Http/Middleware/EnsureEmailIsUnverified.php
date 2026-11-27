<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Fortify\Fortify;
use Symfony\Component\HttpFoundation\Response;

/**
 * The verification prompt is for someone with an address left to verify, as
 * Fortify's own prompt was: anyone verified is sent on to where it would.
 */
class EnsureEmailIsUnverified
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->hasVerifiedEmail()) {
            return redirect()->intended(Fortify::redirects('email-verification'));
        }

        return $next($request);
    }
}
