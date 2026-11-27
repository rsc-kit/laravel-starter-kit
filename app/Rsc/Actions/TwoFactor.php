<?php

namespace App\Rsc\Actions;

use Illuminate\Http\Request;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Laravel\Fortify\Actions\ConfirmTwoFactorAuthentication;
use Laravel\Fortify\Actions\DisableTwoFactorAuthentication;
use Laravel\Fortify\Actions\EnableTwoFactorAuthentication;
use Laravel\Fortify\Actions\GenerateNewRecoveryCodes;
use Laravel\Fortify\Http\Controllers\ConfirmedTwoFactorAuthenticationController;
use Laravel\Fortify\Http\Controllers\RecoveryCodeController;
use Laravel\Fortify\Http\Controllers\TwoFactorAuthenticationController;
use Laravel\Fortify\Http\Controllers\TwoFactorQrCodeController;
use Laravel\Fortify\Http\Controllers\TwoFactorSecretKeyController;

/**
 * Turning two-factor authentication on and off from the security settings
 * page, through Fortify's own controllers and behind the same guards as
 * Fortify's routes: what each answers - back() with a status, the QR code,
 * the recovery codes - is Fortify's.
 */
#[Middleware('auth')]
#[Middleware('password.confirm')]
class TwoFactor
{
    public function enable(Request $request, TwoFactorAuthenticationController $fortify, EnableTwoFactorAuthentication $enable): mixed
    {
        return $fortify->store($request, $enable);
    }

    public function confirm(Request $request, ConfirmedTwoFactorAuthenticationController $fortify, ConfirmTwoFactorAuthentication $confirm): mixed
    {
        return $fortify->store($request, $confirm);
    }

    public function disable(Request $request, TwoFactorAuthenticationController $fortify, DisableTwoFactorAuthentication $disable): mixed
    {
        return $fortify->destroy($request, $disable);
    }

    /** Answers {svg, url}, or nothing before two-factor is enabled. */
    public function qrCode(Request $request, TwoFactorQrCodeController $fortify): mixed
    {
        return $fortify->show($request);
    }

    /** Answers {secretKey}, or nothing before two-factor is enabled. */
    public function secretKey(Request $request, TwoFactorSecretKeyController $fortify): mixed
    {
        return $fortify->show($request);
    }

    /** Answers the recovery codes, or nothing before two-factor is enabled. */
    public function recoveryCodes(Request $request, RecoveryCodeController $fortify): mixed
    {
        return $fortify->index($request);
    }

    public function regenerateRecoveryCodes(Request $request, RecoveryCodeController $fortify, GenerateNewRecoveryCodes $generate): mixed
    {
        return $fortify->store($request, $generate);
    }
}
