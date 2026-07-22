# Server State Registry

A source-owned React server-state architecture built around TanStack Query, Query Key Factory, Zod, and a project transport. The registry distributes customizable code; the bundled Agent Skill adapts it to each backend contract.

## Registry items

- `server-state-core`: shared names, schemas, query override types, option merging, errors, transport, and stream helpers.
- `authenticated-query`: a project-neutral factory for authenticated finite and infinite query hooks.
- `example-memories`: the complete concrete example showing lists, infinite pagination, detail/context queries, streaming, mutations, and cache actions.
- `manage-react-server-state`: the portable Agent Skill plus its Cursor project-rule adapter.

## Install from GitHub

After publishing this folder as a public GitHub repository:

```bash
npx shadcn@latest add barehera/server-state-registry/server-state-core
npx shadcn@latest add barehera/server-state-registry/authenticated-query
npx shadcn@latest add barehera/server-state-registry/manage-react-server-state
```

Install `example-memories` only as a learning/reference feature. Concrete examples live under `registry/examples/<feature>` and deliberately retain their backend contracts; do not rename one into a real feature.

The skill is installed at `.agents/skills/manage-react-server-state`. Cursor also receives `.cursor/rules/manage-react-server-state.mdc`; the adapter points to the same canonical skill rather than duplicating the architecture.

## Authentication integration

Install `authenticated-query`, then connect the project auth hook once:

```ts
import { createAuthenticatedQueryHooks } from "@/server-state/create-authenticated-query-hooks";

import { useAuth } from "./use-auth";

const authenticatedQueries = createAuthenticatedQueryHooks({
  useAuthentication() {
    const { user } = useAuth();
    return { isAuthenticated: Boolean(user) };
  },
});

export const useAuthenticatedQuery =
  authenticatedQueries.useAuthenticatedQuery;
export const useAuthenticatedInfiniteQuery =
  authenticatedQueries.useAuthenticatedInfiniteQuery;
```

The Agent Skill should create this adapter from the actual project auth contract. Protected feature hooks use the configured hook; components do not repeat auth checks.

## Validate

```bash
npm run validate
```

The validated Next.js proving project remains separate at `../next-async-reference`. Make architecture changes there first, verify them, then deliberately sync stable source into this registry.

The proving project now also contains a Posts backend with a different response and pagination contract. Posts server-state is intentionally absent until the published registry and skill are installed; generating it is the first acceptance exercise.

## Package boundary

Do not publish a runtime package until this architecture has been used in multiple different backend projects. Later, extract only primitives that remain unchanged. Schemas, routes, feature APIs, query keys, hooks, authentication adapters, pagination contracts, and cache policy stay source-owned.
