# React Server State Skill Registry

An adaptive Agent Skill for creating, extending, refactoring, and auditing type-safe React server state. It teaches an AI agent how to make decisions from the consuming repository and the real backend contract instead of copying a fixed application architecture.

The skill is designed for TanStack Query projects, but it does not force a folder layout, transport client, validation library, authentication provider, response envelope, or pagination format.

## Quick start

Run this command from the root of a shadcn-configured project:

```bash
npx shadcn@latest add barehera/server-state-registry/manage-react-server-state
```

The registry installs:

- `.agents/skills/manage-react-server-state/`: the canonical skill, focused references, and a complete Posts reference implementation.
- `.cursor/rules/manage-react-server-state.mdc`: a thin Cursor adapter that points to the canonical skill.

It does not:

- Write application code into `src`.
- Install TanStack Query, Zod, Axios, or any other runtime dependency.
- Assume that the project uses feature-based folders.
- Invent backend routes, response envelopes, errors, pagination, or authentication behavior.

Commit the installed files so every developer and supported AI agent uses the same version of the guidance.

## Verify the installation

Check that this file exists:

```text
.agents/skills/manage-react-server-state/SKILL.md
```

Then ask your agent:

```text
What project skills are available?
```

If the tool does not list the skill, use this portable fallback prompt:

```text
Read .agents/skills/manage-react-server-state/SKILL.md completely and follow it
for this task. Load only the references it routes you to, inspect the repository
before proposing a structure, and do not invent missing backend contracts.
```

## Use it in your AI coding tool

The repository keeps one canonical skill under `.agents/skills`. Tools that support that open location discover it directly; other tools can read the same file explicitly. This avoids maintaining several copies that can drift.

### Codex app, CLI, and IDE extension

Codex discovers repository skills under `.agents/skills` and can activate them implicitly when the request matches the skill description.

For explicit invocation, type `$` and select `manage-react-server-state`, or include it directly in the prompt:

```text
Use $manage-react-server-state to inspect this repository and create the Posts
server-state implementation from the backend contract below.
```

You can also run `/skills` in the CLI or IDE to inspect available skills. If a newly installed skill does not appear, restart Codex. See the official [Codex skills documentation](https://developers.openai.com/codex/skills).

### Cursor editor and CLI

Cursor supports Agent Skills in both the editor and CLI and can invoke them automatically or through its slash-command menu. This registry also installs a small `.cursor/rules` adapter so Cursor is directed to the canonical skill when working on query, mutation, or server-state files.

Open Cursor Agent at the project root and either:

- Select `/manage-react-server-state` from the slash-command menu when it is available.
- Write `Use manage-react-server-state` in the request.
- Use the portable fallback prompt shown above.

Example:

```text
Use manage-react-server-state. Audit the existing bookmarks queries and mutations.
Report naming, cache identity, contract, cancellation, and authentication problems
first. Do not edit files yet.
```

Cursor documents Agent Skill discovery and slash invocation in its [Agent Skills release notes](https://cursor.com/changelog/2-4).

### Google Antigravity and Antigravity CLI

Antigravity uses `<project-root>/.agents/skills` for workspace skills, so the default registry installation is already in its native project location.

In Antigravity:

1. Open the consuming project root.
2. Ask `What skills are available?` to verify discovery.
3. Describe the server-state task normally or name `manage-react-server-state` explicitly.

In Antigravity CLI, use `/skills` to list the discovered skills.

```text
Use the manage-react-server-state skill to add cursor pagination to the existing
Products queries. Preserve the backend response exactly and follow this project's
current folder structure.
```

See Google's [Antigravity Skills codelab](https://codelabs.developers.google.com/getting-started-with-antigravity-skills?hl=en) for the official project and global skill locations.

### GitHub Copilot in VS Code, JetBrains, GitHub, and CLI

GitHub Copilot recognizes `.agents/skills` for project skills. The same checked-in installation can be used by Copilot agent mode in VS Code and JetBrains IDEs, Copilot CLI, the Copilot app, the cloud coding agent, and Copilot code review.

Copilot can select the skill from its description. In Copilot CLI, invoke it explicitly with:

```text
/manage-react-server-state
```

Then provide the task and backend contract. See GitHub's [Agent Skills overview](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) and [installation guide](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills).

### Claude Code

Claude Code's native project location is `.claude/skills`, while this registry deliberately keeps the shared source of truth in `.agents/skills`.

After the normal registry installation, use the portable fallback prompt so Claude reads the canonical file directly:

```text
Read .agents/skills/manage-react-server-state/SKILL.md completely and use it to
add the Orders server state. Follow its reference routing and inspect the current
project before editing anything.
```

If Claude Code is the only agent used in a repository and native `/manage-react-server-state` invocation is preferred, GitHub CLI 2.90 or later can install the skill for that host instead of the shadcn command:

```bash
gh skill install barehera/server-state-registry manage-react-server-state --agent claude-code
```

Do not use both installation methods in the same repository unless duplicate host-specific copies are intentional. Claude can also activate skills automatically or through `/skill-name` when they are installed in its native location. See the official [Claude Code skills guide](https://code.claude.com/docs/en/slash-commands).

### Other IDEs and agents

For Windsurf, Cline, Roo Code, or any agent that can read repository files but does not discover `.agents/skills`, use the portable fallback prompt. The workflow does not depend on a proprietary tool API.

Do not paste the full skill into chat. Point the agent to `SKILL.md`; it will load the relevant reference files only when needed.

## What the skill can do

The agent first inspects the repository and builds a project profile from the existing code. It asks only for unresolved backend or architectural facts that materially affect the implementation.

Supported workflows include:

- Establishing server state in a project from scratch.
- Creating a new resource feature from real backend contracts.
- Adding a query, mutation, nested context query, pagination flow, or protected endpoint.
- Refactoring existing server-state code without forcing a different layout.
- Auditing naming, cache identity, contracts, cancellation, validation, authentication, and mutation effects.
- Reusing generated backend types instead of duplicating them with frontend models.
- Keeping hook-level composition while centralizing query options and keys.

The bundled feature-colocated Posts implementation is a reference, not an application template. The skill also explains how to adapt the responsibilities to layer-oriented, domain-oriented, compact, and generated-client projects.

## Give the agent a useful contract

The best result comes from concrete backend facts. Include what is known and let the skill ask only for important gaps:

```text
Feature/resource:
Existing project files to follow:
Transport or generated client:
Authentication requirement:

Endpoints:
- METHOD /route
- Path parameters:
- Query parameters:
- Request body example:
- Success response example:
- Error response example:

Pagination:
- Request page parameter:
- Response next-page field:
- End-of-list value:

Mutation cache effects:
- Detail to write, patch, invalidate, or remove:
- Lists or related queries to invalidate:

Constraints:
- Files or public APIs that must not change:
- Validation preference:
- Anything the agent must not refactor:
```

You do not need to fill every field. Missing information that changes correctness should become a focused question instead of guessed code.

## Example prompts

### Create a new feature

```text
Use $manage-react-server-state.

Inspect this repository first, then create server state for Products using its
existing architecture and libraries. Do not force the bundled Posts layout.

GET /api/products?search=&limit=
Response: { "data": Product[] }

GET /api/products/:productId
Response: { "data": Product }

Product: { id: string, name: string, price: number, updatedAt: string }

Ask me only for missing backend facts that materially affect the implementation.
Do not invent an error envelope or pagination.
```

### Create a cursor-paginated infinite query

```text
Use $manage-react-server-state to add an infinite Orders list.

Request: GET /api/orders?cursor=<string>&limit=<number>
Response: { "data": Order[], "meta": { "nextCursor": string | null } }
`null` means there is no next page. Keep the complete backend page response in
the query cache and derive the next page from meta.nextCursor. Centralize defaults;
do not repeat magic limits in hooks or API functions.
```

### Add an endpoint to an existing feature

```text
Use $manage-react-server-state to add:
GET /api/posts/:postId/comments?limit=<number>
Response: { "data": Comment[] }

Inspect the existing Posts key factory, options, hooks, and cache helpers. Model
comments as a nested context query under the Post detail identity if that matches
the current key hierarchy. Preserve existing public imports and avoid unrelated
refactors.
```

### Add a protected query without unnecessary requests

```text
Use $manage-react-server-state to add the protected Related Products query.
Reuse the project's existing auth/session hook. The request must not run and must
not be manually refetchable while logged out. Keep authentication policy reusable
and separate from the resource's base query options. Preserve caller-provided
select and enabled conditions with correct type inference.
```

### Add a mutation and define cache effects

```text
Use $manage-react-server-state to add PATCH /api/users/:userId.

Request body: Partial<Pick<User, "displayName" | "avatarUrl">>
Response: { "data": User }

On success, write the returned complete User to its detail cache and invalidate
affected user lists. Use the existing naming vocabulary and cache helpers. Do not
optimistically patch unrelated queries.
```

### Use generated backend types

```text
Use $manage-react-server-state to create the Bookmarks queries from our generated
OpenAPI client. Reuse its request, response, pagination, and error types directly.
Do not create duplicate Zod schemas or frontend/backend mapping types unless a real
runtime boundary or model transformation requires them.
```

### Refactor inconsistent code

```text
Use $manage-react-server-state to refactor the Memories server state.

First inspect every query key, option factory, hook, API call, and cache operation.
Standardize on the repository's canonical vocabulary: list, infiniteList, detail,
create, update, delete, setDetail, patchDetail, invalidateLists, and removeDetail.
Report the migration plan before editing. Preserve behavior and public imports.
```

### Audit without changing files

```text
Use $manage-react-server-state to audit this repository's server-state layer only.
Do not modify files. Report concrete findings with file and line references,
ordered by risk. Check backend contract fidelity, query-key identity, normalized
inputs, abort signals, auth gating, cache effects, duplicate magic defaults, and
whether hooks preserve caller query-option type safety.
```

## Update an installed skill

Re-run the registry command from the consuming project:

```bash
npx shadcn@latest add barehera/server-state-registry/manage-react-server-state --overwrite
```

Review the diff before committing. Updating replaces the installed skill/reference files and Cursor adapter; it still does not modify application source files.

## Validate this registry

```bash
npm install
npm run validate
```

The registry intentionally has no runtime package. Backend schemas, routes, error envelopes, auth adapters, pagination rules, and cache policy belong to each consuming project.

## Skill versions

Every push to `main`, including a merged pull request, runs `.github/workflows/release-skill.yml`. The workflow validates and builds the registry, then `semantic-release` analyzes Conventional Commits, generates release notes, creates the Git tag and GitHub Release, and attaches the built `manage-react-server-state.json`.

Use these commit or squash-merge titles:

| Commit | Release |
| --- | --- |
| `fix: correct authenticated query gating` | Patch |
| `docs: improve backend contract guidance` | Patch |
| `refactor: simplify query-key workflow` | Patch |
| `feat: add generated-client workflow` | Minor |
| `feat!: change canonical operation names` | Major |

A `BREAKING CHANGE:` footer also creates a major release. `chore`, `ci`, `test`, and `build` commits do not publish a release by default.

The first qualifying release starts at the stable semantic version:

```text
manage-react-server-state-v1.0.0
```

Later releases are calculated from the latest matching tag, for example `manage-react-server-state-v1.0.1`, `manage-react-server-state-v1.1.0`, or `manage-react-server-state-v2.0.0`. Existing namespaced tags are preserved as semantic-release history, while GitHub displays the release title as the version number only, such as `1.1.0`.

Every release body includes the skill description, latest installation command, categorized Conventional Commit notes, exact registry asset description, and a comparison link when a previous version exists. Documentation and refactoring commits are included instead of producing an empty release body.

The root `package.json` uses `0.0.0-development` intentionally; Git tags and GitHub Releases are the version source of truth. Do not manually edit the package version or create release tags. Use a Conventional Commit and let the workflow calculate the release.

The release configuration lives in `.releaserc.json`. Semantic-release 25 requires Node `^22.14.0` or `>=24.10.0`; the GitHub workflow uses Node 24. Repository Actions must allow the workflow's `contents: write`, `issues: write`, and `pull-requests: write` permissions.
