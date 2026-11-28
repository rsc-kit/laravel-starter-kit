<?php

namespace Tests\Feature\Settings;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_page_is_displayed()
    {
        $this->actingAs(User::factory()->create());

        $this->visit('/settings/profile')->assertExactJson(['result' => true]);
    }

    public function test_profile_information_can_be_updated()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->action('Profile.update', [
                'name' => 'Test User',
                'email' => 'test@example.com',
            ], from: '/settings/profile')
            ->assertOk()
            ->assertJsonPath('result', 'Profile updated.')
            // The sidebar's name and the page's verified state, re-rendered.
            ->assertJsonPath('revalidate', ['all']);

        $user->refresh();

        $this->assertSame('Test User', $user->name);
        $this->assertSame('test@example.com', $user->email);
        $this->assertNull($user->email_verified_at);
    }

    public function test_the_sidebar_shows_the_new_name()
    {
        $this->actingAs(User::factory()->create())
            ->action('Profile.update', [
                'name' => 'Test User',
                'email' => 'test@example.com',
            ], from: '/settings/profile')
            ->assertJson(['revalidate' => ['all']]);
    }

    public function test_email_is_stored_in_lowercase_so_the_user_can_still_log_in()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->action('Profile.update', [
                'name' => 'Test User',
                'email' => 'Test@Example.com',
            ], from: '/settings/profile')
            ->assertOk();

        $this->assertSame('test@example.com', $user->refresh()->email);

        $this->action('Session.destroy', from: '/settings/profile');

        $this->action('Session.store', [
            'email' => 'Test@Example.com',
            'password' => 'password',
        ], from: '/login');

        $this->assertAuthenticatedAs($user);
    }

    public function test_email_must_be_unique_regardless_of_case()
    {
        User::factory()->create(['email' => 'taken@example.com']);

        $this->actingAs(User::factory()->create())
            ->action('Profile.update', [
                'name' => 'Test User',
                'email' => 'Taken@Example.com',
            ], from: '/settings/profile')
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['email'], 'validationErrors');
    }

    public function test_email_verification_status_is_unchanged_when_the_email_address_is_unchanged()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->action('Profile.update', [
                'name' => 'Test User',
                'email' => $user->email,
            ], from: '/settings/profile')
            ->assertOk()
            ->assertJsonPath('result', 'Profile updated.');

        $this->assertNotNull($user->refresh()->email_verified_at);
    }

    public function test_user_can_delete_their_account()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->action('Profile.destroy', ['password' => 'password'], from: '/settings/profile')
            ->assertJson(['redirect' => route('home', absolute: false)]);

        $this->assertGuest();
        $this->assertNull($user->fresh());
    }

    public function test_correct_password_must_be_provided_to_delete_account()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->action('Profile.destroy', ['password' => 'wrong-password'], from: '/settings/profile')
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['password'], 'validationErrors');

        $this->assertNotNull($user->fresh());
    }
}
