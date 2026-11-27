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
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        session()->flash('toast', ['type' => 'success', 'message' => __('Profile updated.')]);

        // The sidebar shows the name, and a redirect keeps the layouts.
        Rsc::revalidate('all');

        return to_route('profile.edit');
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
