<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Fortify\Features;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->skipUnlessFortifyHas(Features::registration());
    }

    public function test_registration_screen_can_be_rendered()
    {
        $this->visit('/register')->assertExactJson(['result' => true]);
    }

    public function test_new_users_can_register()
    {
        $this->action('Registration.store', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ], from: '/register')->assertJson(['redirect' => route('dashboard', absolute: false)]);

        $this->assertAuthenticated();
    }
}
