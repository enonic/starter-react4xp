# starter-react4xp

Enonic XP application template for building React-based websites. Components are rendered server-side and hydrated in the browser, so the same React code runs on both the server and the client.

It bundles [lib-react4xp](https://github.com/enonic/lib-react4xp), the [`@enonic/react4xp`](https://www.npmjs.com/package/@enonic/react4xp) build tool and a working Hello world page.

## Documentation

- **[React4XP reference documentation](https://developer.enonic.com/docs/react4xp)** – library API, configuration, build, entries, chunks, SSR and hydration
- **[React4XP tutorial](https://developer.enonic.com/learn/react4xp-tutorial)** – hands-on, step-by-step introduction
- **[Enonic Market](https://market.enonic.com/starters/react4xp-starter)** – starter listing

## Requirements

| | Version |
|---|---|
| Enonic XP | 8.0.1 or later |
| Node | 24.16.0 or later |
| npm | 11.13.0 or later |

## Get started

Create a project with the [Enonic CLI](https://developer.enonic.com/docs/enonic-cli), then build and deploy it:

```shell
enonic project create -r starter-react4xp
cd <your-project>
enonic project deploy
```

Then add a site in Content Studio with this application enabled. The [tutorial](https://developer.enonic.com/learn/react4xp-tutorial) walks through it.

## Versions

| Ref | React4XP | Enonic XP | React |
|---|---|---|---|
| `master` branch | 7.x | 8.0.1 or later | 19 |
| `6.x` branch | 6.1.0 | 7.16.1 or later | 19 |
| `v5.1.0` tag | 5.1.0 | 7.13.3 or later | 18 |

The 6.x and 7.x lines are maintained as branches and were never tagged. `v5.1.0` is the last tagged release; it predates the `componentRegistry`/`dataFetcher` model and uses Guillotine, so treat it as legacy reference only.

## Issues

Bugs and feature requests: [github.com/enonic/starter-react4xp/issues](https://github.com/enonic/starter-react4xp/issues)

## License

[Apache License 2.0](LICENSE.txt)
