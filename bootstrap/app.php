<?php

use App\Http\Middleware\EnsureEmailIsUnverified;
use App\Http\Middleware\EnsureTwoFactorChallenge;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Named for the pages' middleware.ts, which guard in Laravel's own
        // vocabulary: what Fortify's challenge and prompt views checked.
        $middleware->alias([
            'two-factor.challenged' => EnsureTwoFactorChallenge::class,
            'unverified' => EnsureEmailIsUnverified::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );
    })->create();
