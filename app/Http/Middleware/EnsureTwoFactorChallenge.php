<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * The two-factor challenge is for someone Fortify's login sent on, as
 * Fortify's own challenge view was: anyone else is sent to sign in.
 */
class EnsureTwoFactorChallenge
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->session()->has('login.id')) {
            return redirect()->route('login');
        }

        return $next($request);
    }
}
