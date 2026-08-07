# Basic Vue and Vuex Store

[![Greenkeeper badge](https://badges.greenkeeper.io/alpersonalwebsite/basic-vue-vuex.svg)](https://greenkeeper.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

An easy, basic and raw (no styles attached) example of **HOW to** implement a `Vuex`
store with `state`, `getters`, `actions` and `mutations`, fetching from a REST
endpoint.

## How the pieces fit

| File | Role |
| --- | --- |
| `src/store/index.js` | creates the store and registers modules |
| `src/store/modules/users.js` | state, getters, mutations and the one async action |
| `src/store/modules/queries.js` | the HTTP call, and nothing about the store |
| `src/components/UserList.vue` | dispatches the action, reads the getters |
| `src/components/User.vue` | one row, emits which user was clicked |

The division worth copying: **only mutations touch state, only actions are async, and
the query layer neither knows nor cares that a store exists.** `getUsersQuery` fetches
or throws; the action decides what a failure *means* to the UI, because it is the layer
that owns the state.

The other division is in `UserList.vue`: the user list lives in the store, because
more than one component would want it, and `selectedUserData` is local component
state, because which row is highlighted matters to that list and nothing else.
Knowing which is which is most of what using Vuex well amounts to.

## The bug this repo used to teach

The action looked like this:

```js
commit("setLoadingUsers", true);
const result = await getUsersQuery();   // throws when the API is down
if (result && result.data) { ... }
commit("setLoadingUsers", false);       // never reached
```

One `await` that can reject, and the only `setLoadingUsers(false)` after it. So any
failure left `loadingUsers` stuck at `true`, the UI showed `Loading...` forever, and
the rejection went unhandled because `created()` dispatches and ignores the promise.
The fix is `try`/`catch`/`finally`, plus a `usersError` in state: a store that tracks
*loading* and not *failed* cannot tell a dead endpoint from a working one with no rows.

## Pointing it at an API

The endpoint is `VUE_APP_API_URL`, defaulting to `http://localhost:3333/api/users`,
which is
[node-express-postgresql](https://github.com/alpersonalwebsite/node-express-postgresql)
running locally. That is the project the original hardcoded endpoint
(`node-express-postgre.herokuapp.com`) was serving, before Heroku retired its free
dynos and the host started answering `404 No such app`.

```shell
cp .env.example .env      # then edit it, .env is gitignored
```

Only variables prefixed `VUE_APP_` reach client code, and Vue CLI **inlines them at
build time**, so whatever you put there ends up in `dist/js/app.*.js`. An endpoint URL
is fine. A key or a token is not.

`readUsers` in `queries.js` accepts both a bare array and a `{ "data": [ ... ] }`
wrapper, but the field names are not negotiable: `User.vue` renders `firstname` and
`lastname` and keys on `id`, matching the backend above.

## Project setup

```shell
npm install
```

### Compiles and hot-reloads for development

```shell
npm run serve
```

### Compiles and minifies for production

```shell
npm run build
```

**On Node 17 or newer this fails** with `ERR_OSSL_EVP_UNSUPPORTED`. That is webpack 4
(via `@vue/cli-service` 4) using an MD4 hash that OpenSSL 3 no longer provides, not a
problem with this code. `.nvmrc` says `lts/*`, which today resolves to a Node well
past 17. The dependencies here are deliberately left at their versions, so pass the
flag instead:

```shell
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

`npm run serve` is unaffected.

### Lints and fixes files

```shell
npm run lint
```

Note the `run`. `npm serve` is not a command, and neither are `npm build` or
`npm lint`; earlier versions of this README omitted it. `yarn` allows the shorthand,
`npm` does not.

`no-console` is **off** in development and an **error** in production, so a stray
`console.log` fails `npm run build` and is merely tolerated under `npm run serve`.
Those rules live in `.eslintrc.js`, which until recently was named `eslintrc.js`
without the leading dot: ESLint never read it, so the rules had never once applied.

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
