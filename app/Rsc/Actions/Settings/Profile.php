<?php

namespace App\Rsc\Actions\Settings;

use App\Http\Requests\Settings\ProfileDeleteRequest;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use RscKit\Rsc;

/**
 * The profile settings page's two forms: saving the name and email, and
 * deleting the account.
 */
#[Middleware('auth')]
class Profile
{
    /** The message is the answer, and the form that posted it shows it. */
    public function update(ProfileUpdateRequest $request): string
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        // The sidebar's user menu shows the name, and the page whether the
        // new email is verified: the answer carries both re-rendered.
        Rsc::revalidate('user-menu', 'page');

        return __('Profile updated.');
    }

    #[Middleware('verified')]
    public function destroy(ProfileDeleteRequest $request): RedirectResponse
    {
        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
