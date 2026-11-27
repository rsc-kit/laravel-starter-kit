<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PasswordConfirmationTest extends TestCase
{
    use RefreshDatabase;

    public function test_confirm_password_screen_can_be_rendered()
    {
        $this->actingAs(User::factory()->create());

        $this->visit('/user/confirm-password')->assertExactJson(['result' => true]);
    }

    public function test_password_confirmation_requires_authentication()
    {
        $this->visit('/user/confirm-password')
            ->assertJson(['redirect' => route('login', absolute: false)]);
    }

    public function test_password_can_be_confirmed()
    {
        $this->actingAs(User::factory()->create());

        $this->action('Password.confirm', ['password' => 'password'], from: '/user/confirm-password')
            ->assertOk()
            ->assertSessionHas('auth.password_confirmed_at');
    }

    public function test_password_is_not_confirmed_with_invalid_password()
    {
        $this->actingAs(User::factory()->create());

        $this->action('Password.confirm', ['password' => 'wrong-password'], from: '/user/confirm-password')
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['password'], 'validationErrors')
            ->assertSessionMissing('auth.password_confirmed_at');
    }
}
