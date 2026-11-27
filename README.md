# rsc-kit Laravel Starter Kit

Laravel's React starter kit, with its pages rendered as React Server Components
by [rsc-kit](https://docs.rsc-kit.dev) instead of Inertia.

Everything upstream's kit does is here: registration, login, email
verification, password reset, password confirmation, two-factor authentication
with recovery codes, passkeys, profile and security settings, appearance and
account deletion. Fortify still does the work. The pages are files under
`resources/js/app`, and they read from PHP with `rpc()`.

## Getting started

```bash
laravel new my-app --using=rsc-kit/laravel-starter-kit
cd my-app
composer run dev
```

Open the app at its own url: `http://my-app.test` under Herd, or
`http://localhost:8000` from `composer run dev`.

The guide is at
[docs.rsc-kit.dev/hosts/laravel/starter-kit](https://docs.rsc-kit.dev/hosts/laravel/starter-kit).

## Where things are

| | |
|---|---|
| `resources/js/app` | Pages, layouts and `middleware.ts` guards |
| `app/Rsc` | What pages read: `rpc('Shared.user')` is `App\Rsc\Shared::user()` |
| `app/Rsc/Actions` | What forms submit to, most of them through Fortify's own controllers |
| `resources/js/components` | The shadcn/ui components, unchanged from upstream |

## License

MIT, as upstream's is.
