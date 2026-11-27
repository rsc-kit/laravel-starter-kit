<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Laravel\Fortify\Features;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->skipUnlessFortifyHas(Features::resetPasswords());
    }

    public function test_reset_password_link_screen_can_be_rendered()
    {
        $this->visit('/forgot-password')->assertExactJson(['result' => true]);
    }

    public function test_reset_password_link_can_be_requested()
    {
        Notification::fake();

        $user = User::factory()->create();

        $this->action('Password.email', ['email' => $user->email], from: '/forgot-password')
            ->assertJson(['redirect' => '/forgot-password']);

        Notification::assertSentTo($user, ResetPassword::class);
    }

    public function test_reset_password_screen_can_be_rendered()
    {
        Notification::fake();

        $user = User::factory()->create();

        $this->action('Password.email', ['email' => $user->email], from: '/forgot-password');

        Notification::assertSentTo($user, ResetPassword::class, function ($notification) {
            $this->visit(route('password.reset', $notification->token, absolute: false))
                ->assertExactJson(['result' => true]);

            return true;
        });
    }

    public function test_password_can_be_reset_with_valid_token()
    {
        Notification::fake();

        $user = User::factory()->create();

        $this->action('Password.email', ['email' => $user->email], from: '/forgot-password');

        Notification::assertSentTo($user, ResetPassword::class, function ($notification) use ($user) {
            $this->action('Password.reset', [
                'token' => $notification->token,
                'email' => $user->email,
                'password' => 'password',
                'password_confirmation' => 'password',
            ], from: route('password.reset', $notification->token, absolute: false))
                ->assertJson(['redirect' => route('login', absolute: false)]);

            return true;
        });
    }

    public function test_password_cannot_be_reset_with_invalid_token(): void
    {
        $user = User::factory()->create();

        $this->action('Password.reset', [
            'token' => 'invalid-token',
            'email' => $user->email,
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ], from: '/reset-password/invalid-token')
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['email'], 'validationErrors');
    }
}
