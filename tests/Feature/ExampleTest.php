<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_welcome_page_is_open_to_everyone()
    {
        $this->visit('/')->assertExactJson(['result' => true]);
    }
}
