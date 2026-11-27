<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\RateLimiter;
use Laravel\Fortify\Features;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered()
    {
        $this->visit('/login')->assertExactJson(['result' => true]);
    }

    public function test_signed_in_users_are_sent_on_from_the_login_screen()
    {
        $this->actingAs(User::factory()->create());

        $this->visit('/login')
            ->assertJson(['redirect' => route('dashboard', absolute: false)]);
    }

    public function test_users_can_authenticate_using_the_login_screen()
    {
        $user = User::factory()->create();

        $this->action('Session.store', [
            'email' => $user->email,
            'password' => 'password',
        ], from: '/login')->assertJson(['redirect' => route('dashboard', absolute: false)]);

        $this->assertAuthenticated();
    }

    public function test_users_with_two_factor_enabled_are_redirected_to_two_factor_challenge()
    {
        $this->skipUnlessFortifyHas(Features::twoFactorAuthentication());

        Features::twoFactorAuthentication([
            'confirm' => true,
            'confirmPassword' => true,
        ]);

        $user = User::factory()->withTwoFactor()->create();

        $this->action('Session.store', [
            'email' => $user->email,
            'password' => 'password',
        ], from: '/login')
            ->assertJson(['redirect' => route('two-factor.login', absolute: false)])
            ->assertSessionHas('login.id', $user->id);

        $this->assertGuest();
    }

    public function test_users_can_not_authenticate_with_invalid_password()
    {
        $user = User::factory()->create();

        $this->action('Session.store', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ], from: '/login')
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['email'], 'validationErrors');

        $this->assertGuest();
    }

    public function test_users_can_logout()
    {
        $this->actingAs(User::factory()->create());

        $this->action('Session.destroy', from: '/dashboard')
            ->assertJson(['redirect' => route('home', absolute: false)]);

        $this->assertGuest();
    }

    public function test_users_are_rate_limited()
    {
        $user = User::factory()->create();

        RateLimiter::increment(md5('login'.implode('|', [$user->email, '127.0.0.1'])), amount: 5);

        $this->action('Session.store', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ], from: '/login')->assertTooManyRequests();
    }
}
