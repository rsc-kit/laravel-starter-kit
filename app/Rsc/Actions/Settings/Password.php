<?php

namespace App\Rsc\Actions\Settings;

use App\Http\Requests\Settings\PasswordUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Attributes\Controllers\Middleware;

/** Changing the password from the security settings page. */
#[Middleware('auth')]
#[Middleware('verified')]
class Password
{
    #[Middleware('throttle:6,1')]
    public function update(PasswordUpdateRequest $request): RedirectResponse
    {
        $request->user()->update([
            'password' => $request->password,
        ]);

        session()->flash('toast', ['type' => 'success', 'message' => __('Password updated.')]);

        return back();
    }
}
