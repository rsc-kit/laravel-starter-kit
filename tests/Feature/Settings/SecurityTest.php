<?php

namespace Tests\Feature\Settings;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Fortify\Features;
use Tests\TestCase;

class SecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_security_page_is_displayed()
    {
        $this->skipUnlessFortifyHas(Features::twoFactorAuthentication());

        Features::twoFactorAuthentication([
            'confirm' => true,
            'confirmPassword' => true,
        ]);
        Features::passkeys([
            'confirmPassword' => true,
        ]);

        $this->actingAs(User::factory()->create())
            ->withSession(['auth.password_confirmed_at' => time()]);

        $this->visit('/settings/security')->assertExactJson(['result' => true]);

        $this->rpc('Security.settings')
            ->assertOk()
            ->assertJsonPath('result.canManagePasskeys', true)
            ->assertJsonPath('result.passkeys', [])
            ->assertJsonPath('result.canManageTwoFactor', true)
            ->assertJsonPath('result.twoFactorEnabled', false);
    }

    public function test_security_page_requires_password_confirmation_when_enabled()
    {
        $this->skipUnlessFortifyHas(Features::twoFactorAuthentication());

        Features::twoFactorAuthentication([
            'confirm' => true,
            'confirmPassword' => true,
        ]);

        $this->actingAs(User::factory()->create());

        $this->visit('/settings/security')
            ->assertJson(['redirect' => route('password.confirm', absolute: false)]);
    }

    public function test_security_page_renders_without_two_factor_when_feature_is_disabled()
    {
        $this->skipUnlessFortifyHas(Features::twoFactorAuthentication());

        config(['fortify.features' => []]);

        $this->actingAs(User::factory()->create())
            ->withSession(['auth.password_confirmed_at' => time()]);

        $this->visit('/settings/security')->assertExactJson(['result' => true]);

        $this->rpc('Security.settings')
            ->assertOk()
            ->assertJsonPath('result.canManagePasskeys', false)
            ->assertJsonPath('result.passkeys', [])
            ->assertJsonPath('result.canManageTwoFactor', false)
            ->assertJsonMissingPath('result.twoFactorEnabled')
            ->assertJsonMissingPath('result.requiresConfirmation');
    }

    public function test_password_can_be_updated()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->action('Password.update', [
                'current_password' => 'password',
                'password' => 'new-password',
                'password_confirmation' => 'new-password',
            ], from: '/settings/security')
            ->assertJson(['redirect' => route('security.edit', absolute: false)]);

        $this->assertTrue(Hash::check('new-password', $user->refresh()->password));
    }

    public function test_correct_password_must_be_provided_to_update_password()
    {
        $this->actingAs(User::factory()->create())
            ->action('Password.update', [
                'current_password' => 'wrong-password',
                'password' => 'new-password',
                'password_confirmation' => 'new-password',
            ], from: '/settings/security')
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['current_password'], 'validationErrors');
    }
}
