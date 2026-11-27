<?php

namespace App\Rsc\Actions;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;

/**
 * Signing up, through Fortify's own controller and the app's CreateNewUser.
 */
class Registration
{
    #[Middleware('guest')]
    public function store(Request $request, CreatesNewUsers $creator, RegisteredUserController $fortify): Responsable
    {
        return $fortify->store($request, $creator);
    }
}
