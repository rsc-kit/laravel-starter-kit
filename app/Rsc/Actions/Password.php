<?php

namespace App\Rsc\Actions;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Laravel\Fortify\Http\Controllers\ConfirmablePasswordController;
use Laravel\Fortify\Http\Controllers\NewPasswordController;
use Laravel\Fortify\Http\Controllers\PasswordResetLinkController;
use Laravel\Fortify\Http\Requests\SendPasswordResetLinkRequest;

/**
 * Forgetting, resetting and confirming a password, through Fortify's own
 * controllers: what each answers - the status, the errors, the redirect - is
 * Fortify's.
 */
class Password
{
    #[Middleware('guest')]
    public function email(SendPasswordResetLinkRequest $request, PasswordResetLinkController $fortify): Responsable
    {
        return $fortify->store($request);
    }

    #[Middleware('guest')]
    public function reset(Request $request, NewPasswordController $fortify): Responsable
    {
        return $fortify->store($request);
    }

    #[Middleware('auth')]
    public function confirm(Request $request, ConfirmablePasswordController $fortify): Responsable
    {
        return $fortify->store($request);
    }
}
