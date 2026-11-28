<?php

namespace App\Rsc\Actions\Settings;

use App\Http\Requests\Settings\PasswordUpdateRequest;
use Illuminate\Routing\Attributes\Controllers\Middleware;

/** Changing the password from the security settings page. */
#[Middleware('auth')]
#[Middleware('verified')]
class Password
{
    /**
     * The message is the answer, and the form that posted it shows it: the
     * page has nothing to show for a changed password, so nothing renders.
     */
    #[Middleware('throttle:6,1')]
    public function update(PasswordUpdateRequest $request): string
    {
        $request->user()->update([
            'password' => $request->password,
        ]);

        return __('Password updated.');
    }
}
