<?php

use Illuminate\Support\Facades\Route;

// The settings pages are in resources/js/app/(app)/settings; /settings itself
// is the profile page, as it always was.
Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');
});

Route::get('.well-known/passkey-endpoints', function () {
    return response()->json([
        'enroll' => route('security.edit'),
        'manage' => route('security.edit'),
    ]);
})->name('well-known.passkeys');
