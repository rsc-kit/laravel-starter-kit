<?php

namespace App\Rsc;

use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Laravel\Fortify\Features;

/**
 * What HandleInertiaRequests shared with every page, and what Fortify's views
 * were handed, read by the page that shows it.
 */
class Shared
{
    public function user(Request $request): ?User
    {
        return $request->user();
    }

    /** Whether the user model asks for a verified email address. */
    public function mustVerifyEmail(Request $request): bool
    {
        return $request->user() instanceof MustVerifyEmail;
    }

    /**
     * What Fortify left for the next page - "A new verification link has
     * been sent", "Your password has been reset".
     */
    public function status(Request $request): ?string
    {
        return $request->session()->get('status');
    }

    /**
     * The toast an action flashed - "Profile updated." - for the page it
     * sent the visitor to, as Inertia::flash('toast') was.
     *
     * @return array{type: 'success'|'info'|'warning'|'error', message: string}|null
     */
    public function toast(Request $request): ?array
    {
        return $request->session()->get('toast');
    }

    /**
     * Configuration, the same for every visitor, so a page that reads only
     * this is stored at build.
     *
     * @return array{canResetPassword: bool, canRegister: bool, passwordRules: string}
     */
    public function auth(): array
    {
        return [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'canRegister' => Features::enabled(Features::registration()),
            'passwordRules' => Password::defaults()->toPasswordRulesString(),
        ];
    }

    /**
     * Whether the sidebar is open, from the cookie it writes when toggled -
     * read here so the first paint is the visitor's, not a default the
     * browser corrects after hydration.
     */
    public function sidebarOpen(Request $request): bool
    {
        return $request->cookie('sidebar_state') !== 'false';
    }
}
