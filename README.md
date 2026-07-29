# starter-react4xp (5.x)

Enonic XP application template for building React-based websites. Components are rendered server-side and hydrated in the browser, so the same React code runs on both the server and the client.

It bundles [lib-react4xp](https://github.com/enonic/lib-react4xp), the [`@enonic/react4xp`](https://www.npmjs.com/package/@enonic/react4xp) build tool and a working Hello world page.

> **This is the 5.x branch** – the last React4XP 5 line, for **Enonic XP 7**. It uses Guillotine for data fetching and predates the `componentRegistry`/`dataFetcher` model introduced in 6.x. For new projects use the [`master` branch](https://github.com/enonic/starter-react4xp) (React4XP 7 / XP 8).

## Documentation

- **[React4XP reference documentation](https://developer.enonic.com/docs/react4xp)** – library API, configuration, build, entries, chunks, SSR and hydration
- **[React4XP tutorial](https://developer.enonic.com/learn/react4xp-tutorial)** – hands-on, step-by-step introduction
- **[Enonic Market](https://market.enonic.com/starters/react4xp-starter)** – starter listing

## Requirements

| | Version |
|---|---|
| Enonic XP | 7.13.3 or later |
| Node | 20.13.1 or later |
| npm | 10.5.2 or later |

## Get started

Create a project from this branch with the [Enonic CLI](https://developer.enonic.com/docs/enonic-cli), then build and deploy it:

```shell
enonic project create -r starter-react4xp -b 5.x
cd <your-project>
enonic project deploy
```

Then add a site in Content Studio with this application enabled. The [tutorial](https://developer.enonic.com/learn/react4xp-tutorial) walks through it.

## Versions

| Ref | React4XP | Enonic XP | React |
|---|---|---|---|
| `master` branch | 7.x | 8.0.1 or later | 19 |
| `6.x` branch | 6.1.0 | 7.16.1 or later | 19 |
| `5.x` branch | 5.x | 7.13.3 or later | 18 |

The 5.x, 6.x and 7.x lines are maintained as branches. `master` is the current, recommended line.

## Issues

Bugs and feature requests: [github.com/enonic/starter-react4xp/issues](https://github.com/enonic/starter-react4xp/issues)

## License

[Apache License 2.0](LICENSE.txt)
