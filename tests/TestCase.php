<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Testing\TestResponse;
use Laravel\Fortify\Features;
use RuntimeException;

/**
 * The renderer owns a page - its route, its markup - and asks Laravel what
 * only Laravel knows: whether the page may render, what its reads return,
 * and what an action does. These tests ask the same questions, through the
 * same endpoint, so nothing here needs a renderer running.
 */
abstract class TestCase extends BaseTestCase
{
    private const HOST_SECRET = 'testing';

    protected function setUp(): void
    {
        parent::setUp();

        config(['rsc.host_call_secret' => self::HOST_SECRET]);
    }

    protected function skipUnlessFortifyHas(string $feature, ?string $message = null): void
    {
        if (! Features::enabled($feature)) {
            $this->markTestSkipped($message ?? "Fortify feature [{$feature}] is not enabled.");
        }
    }

    /**
     * Ask whether the page at $path may render, as the renderer does before
     * it renders: the guards its middleware.ts files declare, from the route
     * table the build writes, run against the page's url.
     *
     * Allowed is `result: true`; a guard that redirects answers `redirect`,
     * and a guest the `auth` guard turns away is a 401 the renderer sends to
     * the login page.
     */
    protected function visit(string $path): TestResponse
    {
        [$middleware, $params] = $this->pageAt($path);

        return $this->hostCall('__rsc.middleware', [$middleware, ['url' => url($path), 'params' => $params]]);
    }

    /** Read what a page reads with rpc(). */
    protected function rpc(string $function, mixed ...$args): TestResponse
    {
        return $this->hostCall($function, $args);
    }

    /**
     * Submit a form to a server action, from the page at $from: the page is
     * what back() returns to and what the action's guards read.
     *
     * A redirect is `redirect`, a refusal a 422 with `validationErrors`.
     *
     * @param  array<string, mixed>  $fields
     */
    protected function action(string $function, array $fields = [], ?string $from = null): TestResponse
    {
        return $this->hostCall($function, [$fields], $from);
    }

    /** @param  list<mixed>  $args */
    private function hostCall(string $function, array $args, ?string $from = null): TestResponse
    {
        $server = [
            'CONTENT_TYPE' => 'application/json',
            'HTTP_X_RSC_HOST_SECRET' => self::HOST_SECRET,
        ];

        if ($from !== null) {
            $server['HTTP_X_RSC_PAGE'] = json_encode(['url' => url($from), 'params' => $this->pageAt($from)[1]]);
        }

        return $this->call('POST', '/__rsc/host-call', server: $server, content: (string) json_encode([
            'function' => $function,
            'args' => $args,
        ]));
    }

    /**
     * The middleware and params of the page at $path, from the table
     * resources/js/app is built into.
     *
     * @return array{list<string>, array<string, string>}
     */
    private function pageAt(string $path): array
    {
        $table = json_decode((string) file_get_contents(config('rsc.routes_manifest')), true);
        $parts = array_values(array_filter(explode('/', (string) parse_url($path, PHP_URL_PATH))));

        foreach ($table['routes'] as $route) {
            $params = [];

            foreach ($route['segments'] as $i => $segment) {
                if ($segment['type'] === 'static' && ($parts[$i] ?? null) === $segment['value']) {
                    continue;
                }

                if ($segment['type'] === 'param' && isset($parts[$i])) {
                    $params[$segment['value']] = $parts[$i];

                    continue;
                }

                continue 2;
            }

            if (count($route['segments']) === count($parts)) {
                return [$route['hostMiddleware'], $params];
            }
        }

        throw new RuntimeException("No page under resources/js/app answers {$path}. Has it been built?");
    }
}
