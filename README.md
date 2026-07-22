<div align="center">
  <h1>🧠 React Server State Skill Registry</h1>
  <p><strong>One adaptive Agent Skill for type-safe, maintainable React server state.</strong></p>
  <p>Inspect the project. Respect the backend contract. Compose with the architecture already there.</p>

  <p>
    <a href="https://agentskills.io"><img alt="Agent Skills open standard" src="https://img.shields.io/badge/Agent_Skills-open_standard-7C3AED?style=for-the-badge"></a>
    <img alt="TanStack Query" src="https://img.shields.io/badge/TanStack_Query-adaptive-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-type_safe-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
    <img alt="Multi-agent" src="https://img.shields.io/badge/AI_hosts-multi--agent-16A34A?style=for-the-badge">
    <a href="https://github.com/barehera/server-state-registry/releases"><img alt="Latest release" src="https://img.shields.io/github/v/release/barehera/server-state-registry?display_name=release&style=for-the-badge&color=0EA5E9"></a>
  </p>

  <p>
    <a href="#-quick-start">Quick start</a> ·
    <a href="#-ai-compatibility">AI compatibility</a> ·
    <a href="#-prompt-cookbook">Prompts</a> ·
    <a href="#-skill-versions">Releases</a>
  </p>
</div>

---

This registry teaches an AI coding agent how to create, extend, refactor, and audit server state from the consuming repository and its real backend contract. It is designed for TanStack Query projects, but it does not force a folder layout, transport client, validation library, authentication provider, response envelope, or pagination format.

> [!IMPORTANT]
> An **AI model** and an **AI coding host** are different layers. OpenAI GPT, Claude, Gemini, DeepSeek, Qwen, Mistral, Grok, and Llama-family models can all follow this Markdown skill when their host gives them repository access. Native discovery paths and invocation commands belong to the host—Codex, Claude Code, Gemini CLI, Cursor, Copilot, Antigravity, and similar tools—not to the model API itself.

## ⚡ Quick start

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

> [!NOTE]
> The command installs reusable AI guidance only. It does not write application code or add runtime dependencies.

## ✅ Verify the installation

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

## 🤖 AI compatibility

The repository keeps one canonical skill under `.agents/skills`. Hosts that support this open location discover it directly. The registry adds only a thin Cursor rule adapter; it does not duplicate the skill for every vendor and create multiple sources of truth.

### Agent host support

| Agent host | Default registry install | How to activate |
| --- | --- | --- |
| **OpenAI Codex** — ChatGPT desktop app, CLI, IDE | 🟢 Native `.agents/skills` discovery | Mention `$manage-react-server-state`, run `/skills`, or describe a matching task |
| **Google Gemini CLI** | 🟢 Native `.agents/skills` alias | Run `/skills list`, then describe the task or name the skill |
| **Google Antigravity** — IDE and CLI | 🟢 Native `.agents/skills` discovery | Ask `What skills are available?`; CLI also supports `/skills` |
| **GitHub Copilot** — VS Code, JetBrains, GitHub, CLI, app | 🟢 Native `.agents/skills` discovery | Automatic matching; Copilot CLI also supports `/manage-react-server-state` |
| **Cursor** — editor and CLI | 🟣 Agent Skill support plus installed `.cursor/rules` adapter | Use the slash menu, name the skill, or use the portable prompt |
| **Claude Code** — CLI, IDE, desktop | 🟡 Canonical file is readable; native skills use `.claude/skills` | Use the portable prompt, or install a Claude-native copy instead |
| **Windsurf, Cline, Roo Code, OpenCode, Continue, Aider, and other file-aware agents** | 🟡 Host-dependent discovery | Use the portable prompt and point the agent to the canonical `SKILL.md` |

**Legend:** 🟢 native canonical discovery · 🟣 registry adapter · 🟡 portable or host-dependent usage

### Model provider support

| Model family | Support | What determines discovery |
| --- | --- | --- |
| **OpenAI GPT and Codex models** | ✅ Supported | Codex is native; other GPT-powered hosts use their own skill rules |
| **Anthropic Claude models** | ✅ Supported | Claude Code uses `.claude/skills`; other Claude-powered hosts may read `.agents/skills` |
| **Google Gemini models** | ✅ Supported | Gemini CLI and Antigravity both understand the canonical installation |
| **DeepSeek models** | ✅ Supported through a repository-aware host | DeepSeek is the model provider; the selected coding host supplies repository and skill context |
| **Qwen, Mistral, Grok, Llama, and other models** | ✅ Supported through a repository-aware host | The host must expose the project files or explicitly load `SKILL.md` |

> [!TIP]
> If an agent can read repository files, it can use this skill even without native Agent Skill discovery. Do not paste the entire skill into chat—point the agent to `SKILL.md` so it can follow the skill's progressive reference routing.

## 🧭 Use it in your AI coding tool

### OpenAI Codex and ChatGPT desktop

Codex discovers repository skills under `.agents/skills` and can activate them implicitly when the request matches the skill description. This applies to Codex in the ChatGPT desktop app, Codex CLI, and the IDE extension.

For explicit invocation, type `$` and select `manage-react-server-state`, or include it directly in the prompt:

```text
Use $manage-react-server-state to inspect this repository and create the Posts
server-state implementation from the backend contract below.
```

Run `/skills` in the CLI or IDE to inspect available skills. If a newly installed skill does not appear, restart Codex. A normal model API request or unrelated ChatGPT conversation does not automatically see local repository skills; use a Codex or Work surface that has the project context. See the official [Codex skills documentation](https://developers.openai.com/codex/skills).

### Google Gemini CLI

Gemini CLI discovers workspace skills from `.gemini/skills` and the `.agents/skills` alias, so the normal registry command is already native.

```text
/skills list
```

If the files were installed during an active session, run `/skills reload`. Then prompt normally:

```text
Use manage-react-server-state to audit the existing Products server state. Report
contract and cache-identity problems before changing files.
```

See the official [Gemini CLI Agent Skills guide](https://geminicli.com/docs/cli/using-agent-skills/).

### Google Antigravity and Antigravity CLI

Antigravity uses `<project-root>/.agents/skills` for workspace skills, so the default registry installation is already in its native project location.

1. Open the consuming project root.
2. Ask `What skills are available?` to verify discovery.
3. Describe the task normally or name `manage-react-server-state` explicitly.

In Antigravity CLI, use `/skills` to list the discovered skills.

```text
Use the manage-react-server-state skill to add cursor pagination to the existing
Products queries. Preserve the backend response exactly and follow this project's
current folder structure.
```

See Google's [Antigravity Skills codelab](https://codelabs.developers.google.com/getting-started-with-antigravity-skills?hl=en).

### Anthropic Claude Code

Claude Code's native project location is `.claude/skills`, while this registry deliberately keeps the cross-agent source of truth in `.agents/skills`.

After the normal registry installation, tell Claude to read the canonical file:

```text
Read .agents/skills/manage-react-server-state/SKILL.md completely and use it to
add the Orders server state. Follow its reference routing and inspect the current
project before editing anything.
```

If Claude Code is the only agent used in a repository and native `/manage-react-server-state` invocation is preferred, GitHub CLI 2.90 or later can install a host-native copy **instead of** the shadcn command:

```bash
gh skill install barehera/server-state-registry manage-react-server-state --agent claude-code
```

Avoid both installation methods unless duplicate host-specific copies are intentional. Claude can activate native skills automatically or through `/skill-name`. See the official [Claude Code skills guide](https://code.claude.com/docs/en/slash-commands).

### GitHub Copilot

GitHub Copilot recognizes `.agents/skills` for project skills. The same checked-in installation works with Copilot agent mode in VS Code and JetBrains IDEs, Copilot CLI, the Copilot app, the cloud coding agent, and Copilot code review.

Copilot can select the skill from its description. In Copilot CLI, invoke it explicitly with:

```text
/manage-react-server-state
```

Then provide the task and backend contract. See GitHub's [Agent Skills overview](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) and [installation guide](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills).

### Cursor editor and CLI

Cursor supports Agent Skills in both the editor and CLI and can invoke them automatically or through its slash-command menu. This registry also installs a small `.cursor/rules` adapter that routes server-state tasks to the canonical skill.

- Select `/manage-react-server-state` from the slash menu when it is available.
- Write `Use manage-react-server-state` in the request.
- Use the portable fallback prompt below.

```text
Use manage-react-server-state. Audit the existing bookmarks queries and mutations.
Report naming, cache identity, contract, cancellation, and authentication problems
first. Do not edit files yet.
```

See Cursor's official [Agent Skills release notes](https://cursor.com/changelog/2-4).

### DeepSeek and other model providers

DeepSeek, Qwen, Mistral, Grok, and local Llama-family models do not need separate copies of this skill. Select the model inside a coding host that can read the repository, then use the host's Agent Skill support or the portable prompt. The behavior comes from the canonical instructions and backend facts, not from vendor-specific syntax.

### Universal portable prompt

Use this with any repository-aware agent when automatic discovery is unavailable:

```text
Read .agents/skills/manage-react-server-state/SKILL.md completely and follow it
for this task. Load only the references it routes you to, inspect the repository
before proposing a structure, and do not invent missing backend contracts.
```

## 🧩 What the skill can do

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

## 📦 Give the agent a useful contract

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

## 📝 Prompt cookbook

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

## 🔄 Update an installed skill

Re-run the registry command from the consuming project:

```bash
npx shadcn@latest add barehera/server-state-registry/manage-react-server-state --overwrite
```

Review the diff before committing. Updating replaces the installed skill/reference files and Cursor adapter; it still does not modify application source files.

## 🛠️ Validate this registry

```bash
npm install
npm run validate
```

The registry intentionally has no runtime package. Backend schemas, routes, error envelopes, auth adapters, pagination rules, and cache policy belong to each consuming project.

## 🚀 Skill versions

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

Later releases are calculated from the latest matching tag, for example `manage-react-server-state-v1.0.1`, `manage-react-server-state-v1.1.0`, or `manage-react-server-state-v2.0.0`. Existing namespaced tags are preserved as semantic-release history, while GitHub displays the release title with a concise `v` prefix, such as `v1.1.0`.

Every release body includes the skill description, latest installation command, categorized Conventional Commit notes, exact registry asset description, and a comparison link when a previous version exists. Documentation and refactoring commits are included instead of producing an empty release body.

The root `package.json` uses `0.0.0-development` intentionally; Git tags and GitHub Releases are the version source of truth. Do not manually edit the package version or create release tags. Use a Conventional Commit and let the workflow calculate the release.

The release configuration lives in `.releaserc.json`. Semantic-release 25 requires Node `^22.14.0` or `>=24.10.0`; the GitHub workflow uses Node 24. Repository Actions must allow the workflow's `contents: write`, `issues: write`, and `pull-requests: write` permissions.
