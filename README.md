# Angular Apollo Client Experiment

This shows examples of using the Apollo Client and Apollo-Angular.

**Important:** Make sure to observe the Apollo Cache with the Apollo Dev Tools extension.

## Prerequisites

- [Backend server used by this example](https://github.com/cerino-ligutom/GraphQL-Starter)
  - As of this [commit](https://github.com/cerino-ligutom/GraphQL-Starter/commit/c82e307da83530db473946763fa84a690c7e13c9)
- Angular CLI
- Apollo Dev Tools browser extension
  - For observing the cache

## Getting Started

On one terminal window (run the GraphQL Code Generator tool):

```
npm run graphql
```

On another terminal window (run the Angular app):

```
npm start
```

Then go to [http://localhost:4200](http://localhost:4200)

## Notes

1. See `codegen.yml` for the GraphQL Code Generator configuration/setup

2. `apollo.config.json` file is the config for the Apollo GraphQL VS Code Extension to get code completion on graphql files.

3. `@client` directive is for client-side stuffs. This is an important directive for the apollo client to determine whether to hit the server or not when the query is hit.

4. GraphQL Code Generator watches graphql files as per config and automatically generates TypeScript type definitions based on your valid GraphQL Schema + accompanying apollo-angular services ready to be injected to your components/services.
