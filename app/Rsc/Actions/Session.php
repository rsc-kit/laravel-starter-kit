<?php

namespace App\Rsc\Actions;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Laravel\Fortify\Http\Requests\LoginRequest;

/**
 * Signing in and out, through Fortify's own controller: the throttle, the
 * two-factor redirect and the remembered destination are Fortify's.
 */
class Session
{
    #[Middleware('guest')]
    #[Middleware('throttle:login')]
    public function store(LoginRequest $request, AuthenticatedSessionController $fortify): Responsable
    {
        return $fortify->store($request);
    }

    #[Middleware('auth')]
    public function destroy(Request $request, AuthenticatedSessionController $fortify): Responsable
    {
        return $fortify->destroy($request);
    }
}
