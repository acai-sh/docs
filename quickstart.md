---
title: "Quickstart"
description: "Write your first feature spec and push it to the Acai.sh dashboard. Equip your LLM agents with the `acai` CLI and teach them to follow a spec-first workflow."
sidebarTitle: "Quickstart"
mode: wide
---

## Quickest Quickstart

Just ask an agent show you around.

<Prompt description={`Dear Claude,  
Let's try using acai.sh. Run \`npx @acai.sh/cli skill\` to learn about it. I want to write my very first feature spec. Think of a good new feature to add to this app. Be ambitious. When you've made up your mind, draft a \`feature.yaml\` spec for me to read. `}>Dear Claude, I'm learning how to use acai to write my very first feature spec. Run \`npx @acai.sh/cli skill\` to learn about it. Think of a simple new feature to add to this app, as an example. Draft a \`feature.yaml\` spec for me to read.</Prompt>



## Add to an existing project

<Info>
**Prerequisites**  
You only need `git` and a software project to work on.  
Claude, Opencode, Codex or a similar agent harness is highly recommended.
</Info>

### 1. Install CLI

<CodeGroup>
```sh npm
npm i --save-dev @acai.sh/cli
```

```sh pnpm
pnpm add --save-dev @acai.sh/cli
```

```sh bun
bun add --dev @acai.sh/cli
```

```sh yarn
yarn add --dev @acai.sh/cli
```
</CodeGroup>

If you don't have a JavaScript runtime, you can find binary releases on our [GitHub](https://github.com/acai-sh/cli).

Confirm that it's installed properly:
```sh
acai --help
```

### 2. Authenticate the CLI

You need to create a team at https://app.acai.sh (or on your self-hosted server).

From the Team Home page, create an access token.

Save the token to .env:
```.env
ACAI_API_TOKEN=at_my_secret_team_access_token
```

### 3. Install SKILL.md

```sh
acai skill --install
# writes to .agents/skills/acai/SKILL.md
```

### 4. Write a spec

Read our [spec-writing tutorial](./writing-specs) for a slightly more detailed introduction to writing specs the Acai way.

In short, the spec is just an organized list of acceptance criteria.

```yaml
# features/my-feature.feature.yaml
feature:
  name: user-auth
  product: enterprise-api

components:
  LOGIN:
    requirements:
      1: Shows an email and password input
      2: Includes a "Forgot Password" link
      3: On success, navigates to the team overview

constraints:
   AUTH:
      1: Does not leak information about existence or absence of a user's email
```

<Warning color="red">Spec files **must** be named `<feature-name>.feature.yaml` and **must** be somewhere under the `features/` directory in the root of your git project.</Warning>

AI can help you draft specs, but nothing beats an organic, pasture-raised, hand-written spec. Spec-writing is where the act of *software engineering* really happens.

### 5. Annotate code and tests with ACIDs

By writing specs in structured yaml, we can refer to each requirement with a unique and stable identifier. For example, `user-auth.LOGIN.3`. We call these IDs "ACIDs" (Acceptance Criteria Identifier).

The Acai CLI scans your repo to find ACIDs in comments and in tests.
These simple refs help guide AI agents during implementation, assists code review and QA, and helps you enforce strong E2E test coverage.

```ts animated-terminal.test.ts
// When we tag tests with requirement IDs, the acai.sh dashboard automatically tracks coverage!
describe("Constraints", () => {
    // animated-terminal.DEV.1 - Dev constraint
    it("self-contained standalone component (no imports)", () => {});
});

describe("UI rendering", () => {
    // animated-terminal.FRAME.1
    it("renders scrollable mock chat history", () => {});
    // animated-terminal.FRAME.1-1
    it("auto-scrolls ONLY if user is at bottom threshold", () => {});
    // animated-terminal.FRAME.2
    it("renders mock text input", () => {});
    // animated-terminal.FRAME.2-1
    it("ignores user typing and button interactions", () => {});
});
```

Typically, LLMs are very good at annotating their work as they go, and are good at re-aligning it when the spec changes. Just make sure they have read the `acai skill`.

### 6. Push & review

```sh
acai push --all
```
Acai scans the repo and pushes all specs and any references to specs / ACIDs.  

Log in to acai.sh to see an overview of your products, features and implementations. It is a helpful place to review coverage, flag issues, and to track specs and their implementations from PR to production.

You (human or robot) can mark requirements as <Badge color="blue">Completed</Badge> when they are ready for review, <Badge color="green">Accepted</Badge> when they pass your review, or <Badge color="red">Rejected</Badge> if something was missed.

## Self-host

The acai server is open-source and containerized. You can host it yourself and point your CLI at it using an environment variable. See [GitHub](https://acai.sh) for more info.
```sh
# Example override, e.g. a local docker network
ACAI_API_BASE_URL=http://caddy:80/api/v1
# defaults to https://acai.sh/api/v1
```


## Next Steps

<CardGroup cols={2}>
  <Card
    title="Spec-driven Development"
    icon="terminal"
    href="/spec-driven-development"
  >
      A tutorial on spec-driven software development
  </Card>
  <Card
    title="Dashboard"
    icon="layout-dashboard"
    href="/writing-specs"
  >
      An intro to the feature.yaml format for spec documents
  </Card>
</CardGroup>
